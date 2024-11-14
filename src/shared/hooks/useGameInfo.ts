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
  const [isItemAnimation, setIsAnimation] = useState<boolean>(false);
  const [attackInfo, setAttackInfo] = useState<AttackInfo | null>(null);
  const [isAddItem, setIsAddItem] = useState<boolean>(false);
  const clientRef = useRef<Client | null>(null);
  const [receivedAttackQueue, setReceivedAttackQueue] = useState<AttackInfo[]>(
    [],
  );

  const processNextAttackInQueue = useCallback(() => {
    if (receivedAttackQueue.length > 0 && !isItemAnimation) {
      setAttackInfo(receivedAttackQueue[0]);
      setIsAnimation(true);
    }
  }, [receivedAttackQueue, isItemAnimation]);

  const handleAnimationComplete = useCallback(() => {
    setIsAnimation(false);
    setAttackInfo(null);
    setReceivedAttackQueue((prevQueue) => prevQueue.slice(1));

    processNextAttackInQueue();
  }, [attackInfo, processNextAttackInQueue]);

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
        setReceivedAttackQueue((prevQueue) => [...prevQueue, attackData]);
      } else if (event.type === "ITEM") {
        setIsAddItem(true);
        refreshItemList();
      } else {
        console.warn("Unknown event type:", event.type);
      }
    },
    [userId, refreshItemList],
  );

  useEffect(() => {
    processNextAttackInQueue();
  }, [receivedAttackQueue, processNextAttackInQueue]);

  const connectWebSocket = useCallback(async () => {
    const { baseURL } = customAxios.defaults;
    const socket = new SockJS(`${baseURL}/ws`);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        setIsConnected(true);

        stompClient.subscribe(`/topic/room/${roomId}`, (message: IMessage) => {
          const event: GameEvent = JSON.parse(message.body);
          processEvent(event);
        });
      },
      onStompError: (frame) => {
        console.error(`WebSocket error: ${frame.headers.message}`);
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
    setReceivedAttackQueue([]);
  }, []);

  return {
    isConnected,
    isItemAnimation,
    attackInfo,
    isAddItem,
    setIsAddItem,
    connectWebSocket,
    disconnectWebSocket,
    handleAnimationComplete,
  };
};
