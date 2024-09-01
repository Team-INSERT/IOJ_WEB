import { useState, useEffect } from "react";
import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { customAxios } from "../utils/customAxios";

export const useWebSocket = () => {
  const [client, setClient] = useState<Client | null>(null);
  const [userSessionId, setUserSessionId] = useState<string | null>(null);
  const [consoleOutput, setConsoleOutput] = useState<string>("");
  const [isExecutionActive, setIsExecutionActive] = useState<boolean>(false);

  useEffect(() => {
    const { baseURL } = customAxios.defaults;

    const socket = new SockJS(`${baseURL}/execution`);

    // STOMP 클라이언트 설정
    const stompClient = new Client({
      webSocketFactory: () => socket,
      debug(str) {
        console.log(str);
      },
      onConnect: async (frame) => {
        console.log(`Connected: ${frame}`);

        try {
          const response = await customAxios.get(`/execution`);
          const newSessionId = response.data;
          setUserSessionId(newSessionId);
          setIsExecutionActive(true);

          stompClient.subscribe(
            `/topic/output/${newSessionId}`,
            (message: IMessage) => {
              console.log("Received message: ", message.body);
              setConsoleOutput((prev) => `${prev + message.body}\n`);

              if (message.body.includes("Process finished with exit code")) {
                setIsExecutionActive(false);
              }
            },
          );

          stompClient.subscribe(
            `/topic/error/${newSessionId}`,
            (message: IMessage) => {
              console.log("Received error: ", message.body);
              setConsoleOutput((prev) => `${prev}ERROR: ${message.body}\n`);
            },
          );
        } catch (error) {
          console.error("Error fetching session ID:", error);
        }
      },
      onStompError: (frame) => {
        console.error(`Broker reported error: ${frame.headers.message}`);
        console.error(`Additional details: ${frame.body}`);
      },
    });

    stompClient.activate();
    setClient(stompClient);

    return () => {
      stompClient.deactivate();
    };
  }, []);

  return {
    client,
    userSessionId,
    consoleOutput,
    isExecutionActive,
    setConsoleOutput,
    setIsExecutionActive,
  };
};
