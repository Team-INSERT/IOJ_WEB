import { useCallback, useRef, useState, useEffect } from "react";
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

export const useGameInfo = (
  roomId: string,
  userId: number,
  refreshItemList: () => void,
) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const isItemAnimation = useRef<boolean>(false);
  const [attackInfo, setAttackInfo] = useState<AttackInfo | null>(null);
  const [isAddItem, setIsAddItem] = useState<boolean>(false);
  const clientRef = useRef<Client | null>(null);
  const [receivedAttackQueue, setReceivedAttackQueue] = useState<AttackInfo[]>(
    [],
  );

  const processNextAttackInQueue = useCallback(() => {
    if (!isItemAnimation.current && receivedAttackQueue.length > 0) {
      const nextItem = receivedAttackQueue[0];
      setAttackInfo(nextItem);
      isItemAnimation.current = true;
    }
  }, [receivedAttackQueue]);

  const handleAnimationComplete = useCallback(() => {
    isItemAnimation.current = false;
    setAttackInfo(null);
    setReceivedAttackQueue((prevQueue) => {
      const updatedQueue = prevQueue.slice(1);
      return updatedQueue;
    });
  }, [attackInfo]);

  const processEvent = useCallback(
    (event: GameEvent) => {
      if (
        event.type === "ATTACK" &&
        event.item &&
        event.targetUser === userId &&
        event.attackUser !== undefined
      ) {
        const attackData: AttackInfo = {
          item: event.item,
          targetUser: event.targetUser,
          attackUser: event.attackUser,
        };

        setReceivedAttackQueue((prevQueue) => {
          const updatedQueue = [...prevQueue, attackData];
          return updatedQueue;
        });
      } else if (event.type === "ITEM") {
        setIsAddItem(true);
        refreshItemList();
      } else {
        console.warn("알 수 없는 이벤트:", event.type);
      }
    },
    [userId, refreshItemList],
  );

  useEffect(() => {
    if (receivedAttackQueue.length > 0 && !isItemAnimation.current) {
      processNextAttackInQueue();
    }
  }, [receivedAttackQueue, processNextAttackInQueue]);

  const connectWebSocket = useCallback(async () => {
    const { baseURL } = customAxios.defaults;
    const socket = new SockJS(`${baseURL}/ws`);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        setIsConnected(true);

        stompClient.subscribe(`/topic/room/${roomId}`, (message: IMessage) => {
          try {
            const event: GameEvent = JSON.parse(message.body);
            processEvent(event);
          } catch (error) {
            console.error("WebSocket 메시지 처리 중 오류:", error);
          }
        });
      },
      onStompError: (frame) => {
        console.error("WebSocket 오류:", frame.headers.message);
        setIsConnected(false);
      },
    });
    stompClient.activate();
    clientRef.current = stompClient;
  }, [roomId, processEvent]);

  // WebSocket 연결 해제
  const disconnectWebSocket = useCallback(() => {
    if (clientRef.current) {
      clientRef.current.deactivate();
    }
    setIsConnected(false);
    isItemAnimation.current = false;
    setAttackInfo(null);
    setIsAddItem(false);
    setReceivedAttackQueue([]);
  }, []);

  return {
    isConnected,
    isItemAnimation: isItemAnimation.current,
    attackInfo,
    isAddItem,
    setIsAddItem,
    connectWebSocket,
    disconnectWebSocket,
    handleAnimationComplete,
  };
};
