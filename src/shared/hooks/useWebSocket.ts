import { useState, useRef } from "react";
import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { customAxios } from "../utils/customAxios";

export const useWebSocket = () => {
  const [consoleOutput, setConsoleOutput] = useState<string>("");
  const [isExecutionActive, setIsExecutionActive] = useState<boolean>(false);
  const clientRef = useRef<Client | null>(null); 
  const sessionIdRef = useRef<string | null>(null); 
  const isSubscribedRef = useRef<boolean>(false); 
  const processingRef = useRef<boolean>(false); 

  const processMessage = (message: string) => {
    const trimmedMessage = message.trimStart();
    setConsoleOutput((prevOutput) => `${prevOutput}${trimmedMessage}\n`);
  };

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
            setIsExecutionActive(true); // WebSocket 실행 상태 활성화
            const response = await customAxios.get(`/execution`);
            const sessionId = response.data;
            sessionIdRef.current = sessionId;
            setConsoleOutput("");
            if (!isSubscribedRef.current) {
              isSubscribedRef.current = true;
              stompClient.subscribe(
                `/topic/output/${sessionId}`,
                (message: IMessage) => {
                  processMessage(message.body);
                },
              );

              stompClient.subscribe(
                `/topic/error/${sessionId}`,
                (message: IMessage) => {
                  console.log("Received error:", message.body);
                  setConsoleOutput(
                    (prevOutput) => `${prevOutput}\nError: ${message.body}`,
                  );
                },
              );
            }
            resolve();
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
    processingRef.current = false;
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
