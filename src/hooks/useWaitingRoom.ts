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

export const useWaitingRoom = (roomId: string) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [roomStatus, setRoomStatus] = useState<
    "waiting" | "started" | "deleted"
  >("waiting");
  const clientRef = useRef<Client | null>(null);

  const processEvent = useCallback((event: RoomEvent) => {
    console.log("Received event:", event); // 이벤트 로그 확인
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
        setRoomStatus("started");
        break;
      case "DELETE":
        setRoomStatus("deleted");
        break;
      default:
        console.warn(`Unknown event type: ${event.type}`);
    }
  }, []);

  const connectWebSocket = useCallback(async () => {
    const { baseURL } = customAxios.defaults;
    const socket = new SockJS(`${baseURL}/ws`);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      debug(str: string) {
        console.log("STOMP debug:", str); // 연결 확인용 로그
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
    roomStatus,
    connectWebSocket,
    disconnectWebSocket,
    sendEvent,
  };
};
