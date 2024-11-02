import { useState, useRef, useCallback } from "react";
import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { customAxios } from "@/shared/utils/customAxios";

interface User {
  nickname: string;
  color: string;
  ready: boolean;
  host: boolean;
}

interface RoomEvent {
  type: "JOIN" | "LEAVE" | "READY" | "START" | "DELETE";
  nickname?: string;
  color?: string;
  ready?: boolean;
  host?: boolean;
}

export const useWaitingRoom = (roomId: string) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [roomStatus, setRoomStatus] = useState<
    "waiting" | "started" | "deleted"
  >("waiting");
  const clientRef = useRef<Client | null>(null);

  const initializeUsers = useCallback((initialUsers: User[]) => {
    console.log("Initializing users with:", initialUsers);
    setUsers(initialUsers);
  }, []);

  const processEvent = useCallback((event: RoomEvent) => {
    console.log("Received event:", event);
    switch (event.type) {
      case "JOIN":
        setUsers((prev) => {
          console.log("Previous users:", prev);
          console.log("Adding user:", event.nickname);
          if (prev.some((user) => user.nickname === event.nickname)) {
            return prev;
          }
          const newUsers = [
            ...prev,
            {
              nickname: event.nickname!,
              color: event.color!,
              ready: false,
              host: event.host || false,
            },
          ];
          console.log("New users state:", newUsers);
          return newUsers;
        });
        break;
      case "LEAVE":
        setUsers((prev) => {
          const newUsers = prev.filter(
            (user) => user.nickname !== event.nickname,
          );
          console.log("User left. New users state:", newUsers);
          return newUsers;
        });
        break;
      case "READY":
        setUsers((prev) => {
          const newUsers = prev.map((user) =>
            user.nickname === event.nickname
              ? { ...user, ready: event.ready! }
              : user,
          );
          console.log("Ready status changed. New users state:", newUsers);
          return newUsers;
        });
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
        console.log("STOMP debug:", str);
      },
      onConnect: () => {
        console.log("Connected to WebSocket");
        setIsConnected(true);
        stompClient.subscribe(`/topic/room/${roomId}`, (message: IMessage) => {
          console.log("Received message:", message.body);
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
      console.log("Sending event:", { destination, body });
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
    initializeUsers,
  };
};
