import { useState, useRef } from "react";
import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { customAxios } from "../utils/customAxios";

export const useWebSocket = () => {
  const [consoleOutput, setConsoleOutput] = useState<string>(""); // 콘솔 출력 상태
  const [isExecutionActive, setIsExecutionActive] = useState<boolean>(false); // WebSocket 실행 상태

  const clientRef = useRef<Client | null>(null); // WebSocket 클라이언트
  const sessionIdRef = useRef<string | null>(null); // 세션 ID 저장
  const isSubscribedRef = useRef<boolean>(false); // 중복 구독 방지 플래그
  const processingRef = useRef<boolean>(false); // 메시지 처리 중인지 확인하는 플래그

  const processMessage = (message: string) => {
    const trimmedMessage = message.trimStart();
    setConsoleOutput((prevOutput) => `${prevOutput}${trimmedMessage}\n`);
    console.log(trimmedMessage);
  };

  // WebSocket 연결 함수
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
            console.log("Session ID:", sessionId);
            setConsoleOutput(""); // 콘솔 출력 초기화

            // 중복 구독 방지
            if (!isSubscribedRef.current) {
              isSubscribedRef.current = true;

              // 메시지 수신 시 메시지 처리
              stompClient.subscribe(
                `/topic/output/${sessionId}`,
                (message: IMessage) => {
                  processMessage(message.body);
                },
              );

              // 에러 메시지 처리
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

      stompClient.activate(); // WebSocket 클라이언트 활성화
      clientRef.current = stompClient; // 클라이언트 참조 저장
    });

  // WebSocket 연결 해제 함수
  const disconnectWebSocket = () => {
    if (clientRef.current) {
      clientRef.current.deactivate(); // WebSocket 연결 해제
      setConsoleOutput(""); // 콘솔 출력 상태 초기화
    }
    setIsExecutionActive(false); // WebSocket 실행 상태 비활성화
    isSubscribedRef.current = false; // 구독 플래그 초기화
    processingRef.current = false; // 메시지 처리 플래그 초기화
  };

  return {
    clientRef, // WebSocket 클라이언트 참조 반환
    sessionIdRef, // 세션 ID 참조 반환
    consoleOutput, // 콘솔 출력 상태 반환
    isExecutionActive, // WebSocket 실행 상태 반환
    setConsoleOutput, // 콘솔 출력 상태 설정 함수 반환
    setIsExecutionActive, // WebSocket 실행 상태 설정 함수 반환
    connectWebSocket, // WebSocket 연결 함수 반환
    disconnectWebSocket, // WebSocket 연결 해제 함수 반환
  };
};
