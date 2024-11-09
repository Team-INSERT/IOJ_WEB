import { useCallback, useRef, useState } from "react";
import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { customAxios } from "../utils/customAxios";

interface AttackInfo {
  item: "INK" | "DEVIL" | "BUBBLE" | "MIRROR";
  targetUser: number;
  attackUser: number;
}

interface GameEvent {
  type: "ATTACK" | "ITEM";
  item?: "INK" | "DEVIL" | "BUBBLE" | "MIRROR";
  targetUser?: number;
  attackUser?: number;
}

export const useGameInfo = (roomId: string, userId: number) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isItemAnimation, setIsAnimation] = useState<boolean>(false);
  const [attackInfo, setAttackInfo] = useState<AttackInfo | null>(null);
  const [isAddItem, setIsAddItem] = useState<boolean>(false);
  const clientRef = useRef<Client | null>(null);

  const processEvent = useCallback(
    (event: GameEvent) => {
      console.log("Received event:", event); // 전체 이벤트 출력

      if (event.type === "ATTACK" && event.item && event.targetUser !== undefined && event.attackUser !== undefined) {
        const attackData: AttackInfo = {
          item: event.item,
          targetUser: event.targetUser,
          attackUser: event.attackUser,
        };

        if (attackData.targetUser === userId) {
          console.log("같다! targetUser와 userId가 동일함");
        } else {
          console.log("다르다! targetUser와 userId가 다름");
        }
        setIsAnimation(true);
        setAttackInfo(attackData);
      } else if (event.type === "ITEM") {
        console.log("아이템 추가 이벤트");
        setIsAddItem(true);
      } else {
        console.warn("알 수 없는 이벤트 타입:", event.type);
      }
    },
    [userId],
  );

  const connectWebSocket = useCallback(async () => {
    const { baseURL } = customAxios.defaults;
    const socket = new SockJS(`${baseURL}/ws`);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log("Connect to Websocket");
        setIsConnected(true);

        stompClient.subscribe(`/topic/room/${roomId}`, (message: IMessage) => {
          const event: GameEvent = JSON.parse(message.body);
          processEvent(event);
        });
      },
      onStompError: (frame) => {
        console.error(`${frame.headers.message}`);
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
    setIsAnimation(false);
    setAttackInfo(null);
    setIsAddItem(false);
  }, []);

  return {
    isConnected,
    isItemAnimation,
    attackInfo,
    isAddItem,
    connectWebSocket,
    disconnectWebSocket,
  };
};