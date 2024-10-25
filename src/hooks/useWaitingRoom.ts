import { useState, useRef, useCallback } from "react";
import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { customAxios } from "@/shared/utils/customAxios";

interface User {
  nickname: string;
  color: string;
  ready: boolean;
}

interface RoomEvent {
  type: "JOIN" | "LEAVE" | "READY" | "START" | "DELETE";
  nickname?: string;
  color?: string;
  ready?: boolean;
}

export const useWaitingRoom = (roomId: number) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const clientRef = useRef<Client | null>(null);
  const processEvent = useCallback((event: RoomEvent) => {
    switch (event.type) {
      case "JOIN":
        setUsers((prev) => [
          ...prev,
          { nickname: event.nickname!, color: event.color!, ready: false },
        ]);
        break;
      case "LEAVE":
        setUsers((prev) =>
          prev.filter((user) => user.nickname !== event.nickname),
        );
        break;
      case "READY":
        setUsers((prev) =>
          prev.map((user) =>
            user.nickname === event.nickname
              ? { ...user, ready: event.ready! }
              : user,
          ),
        );
        break;
      case "START":
        // 게임 시작 로직
        break;
      case "DELETE":
        // 방 삭제 로직
        break;
      default:
        console.warn(`알 수 없는 이벤트 타입: ${event.type}`);
    }
  }, []);

  const connectWebSocket = useCallback(async () => {
    const { baseURL } = customAxios.defaults;
    const socket = new SockJS(`${baseURL}/ws`);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      debug(str: string) {
        console.log(str);
      },
      onConnect: () => {
        console.log("Connected to WebSocket");
        setIsConnected(true);
        stompClient.subscribe(`/topic/room/${roomId}`, (message: IMessage) => {
          const event: RoomEvent = JSON.parse(message.body);
          processEvent(event);
        });
      },
      onStompError: (frame) => {
        console.error(`Broker reported error: ${frame.headers.message}`);
        setIsConnected(false);
      },
    });
    stompClient.activate();
    clientRef.current = stompClient;
  }, [roomId, processEvent]);

  const disconnectWebSocket = useCallback(() => {
    if (clientRef.current) {
      clientRef.current.deactivate();
    }
    setIsConnected(false);
    setUsers([]);
  }, []);

  const sendEvent = useCallback((destination: string, body: any) => {
    if (clientRef.current && clientRef.current.connected) {
      clientRef.current.publish({
        destination,
        body: JSON.stringify(body),
      });
    } else {
      console.error("WebSocket is not connected");
    }
  }, []);

  return {
    users,
    isConnected,
    connectWebSocket,
    disconnectWebSocket,
    sendEvent,
  };
};
