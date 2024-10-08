import { useState, useRef } from "react";
import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { customAxios } from "../utils/customAxios";

export const useWebSocket = () => {
  const [consoleOutput, setConsoleOutput] = useState<string>("");
  const [isExecutionActive, setIsExecutionActive] = useState<boolean>(false);

  const clientRef = useRef<Client | null>(null);
  const sessionIdRef = useRef<string | null>(null);
  const isSubscribedRef = useRef<boolean>(false); // 구독 중복 방지

  const connectWebSocket = async () =>
    new Promise<void>((resolve, reject) => {
      const { baseURL } = customAxios.defaults;
      const socket = new SockJS(`${baseURL}/ws`);

      const stompClient = new Client({
        webSocketFactory: () => socket,
        debug(str: string) {
          console.log(str);
        },
        onConnect: async (frame) => {
          console.log("Connected to WebSocket:", frame);

          try {
            setIsExecutionActive(true);
            const response = await customAxios.get(`/execution`);
            const sessionId = response.data;
            sessionIdRef.current = sessionId;
            console.log("Session ID:", sessionId);
            setConsoleOutput("");

            if (!isSubscribedRef.current) {
              isSubscribedRef.current = true;

              stompClient.subscribe(
                `/topic/output/${sessionId}`,
                (message: IMessage) => {
                  setConsoleOutput(() => `${message.body}`);
                  console.log(message.body);
                },
              );

              stompClient.subscribe(
                `/topic/error/${sessionId}`,
                (message: IMessage) => {
                  console.log("Received error:", message.body);
                  setConsoleOutput(() => `${message.body}`);
                },
              );
            }
            resolve(); // 세션 ID를 받아온 후에 웹소켓 연결 완료로 처리
          } catch (error) {
            console.error("Error fetching session ID:", error);
            reject(error);
          }
        },
        onStompError: (frame) => {
          console.error(`Broker reported error: ${frame.headers.message}`);
          reject(frame.body);
        },
      });

      stompClient.activate();
      clientRef.current = stompClient;
    });

  const disconnectWebSocket = () => {
    if (clientRef.current) {
      clientRef.current.deactivate();
      setConsoleOutput("");
    }
    setIsExecutionActive(false);
    isSubscribedRef.current = false;
  };

  return {
    clientRef,
    sessionIdRef,
    consoleOutput,
    isExecutionActive,
    setConsoleOutput,
    setIsExecutionActive,
    connectWebSocket,
    disconnectWebSocket,
  };
};
