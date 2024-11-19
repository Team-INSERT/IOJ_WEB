import { useCallback, useRef, useState, useEffect } from "react";
import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { getAttackStart } from "@/pages/game/api/getAttackStart";
import { customAxios } from "../utils/customAxios";

interface AttackInfo {
  item: "INK" | "DEVIL" | "BUBBLE" | "MIRROR";
  targetUser: number;
  attackItemId: number;
}

interface GameEvent {
  type: "ATTACK" | "ITEM";
  item?: "INK" | "DEVIL" | "BUBBLE" | "MIRROR";
  targetUser?: number;
  attackItemId?: number;
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
  const handledAttackIds = useRef<Set<number>>(new Set());

  const clearHandledAttackIds = useCallback(() => {
    handledAttackIds.current.clear();
  }, []);

  const processNextAttackInQueue = useCallback(() => {
    if (isItemAnimation.current || receivedAttackQueue.length === 0) {
      return;
    }

    const nextItem = receivedAttackQueue[0];

    if (handledAttackIds.current.has(nextItem.attackItemId)) {
      console.warn(
        "이미 방어된 공격입니다. 다음으로 넘어갑니다. ID:",
        nextItem.attackItemId,
      );
      setReceivedAttackQueue((prevQueue) => prevQueue.slice(1));
      return;
    }

    setAttackInfo(nextItem);
    isItemAnimation.current = true;

    try {
      getAttackStart(nextItem.attackItemId);
    } catch (error) {
      isItemAnimation.current = false;
    }
  }, [receivedAttackQueue]);

  const handleAnimationComplete = useCallback(() => {
    setReceivedAttackQueue((prevQueue) => {
      const updatedQueue = prevQueue.slice(1);

      if (attackInfo) {
        handledAttackIds.current.add(attackInfo.attackItemId);
      }
      if (updatedQueue.length > 0) {
        const nextItem = updatedQueue[0];
        if (!handledAttackIds.current.has(nextItem.attackItemId)) {
          setAttackInfo(nextItem);
        } else {
          console.warn(
            "큐에 있는 다음 공격이 이미 방어되었습니다:",
            nextItem.attackItemId,
          );
        }
      } else {
        console.error("큐가 비어있음, 공격 중단");
      }

      return updatedQueue;
    });

    isItemAnimation.current = false;
  }, [attackInfo]);

  const processEvent = useCallback(
    (event: GameEvent) => {
      if (
        event.type === "ATTACK" &&
        event.item &&
        event.targetUser === userId &&
        event.attackItemId !== undefined
      ) {
        const attackData: AttackInfo = {
          item: event.item,
          targetUser: event.targetUser,
          attackItemId: event.attackItemId,
        };
        setReceivedAttackQueue((prevQueue) => [...prevQueue, attackData]);
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
    clearHandledAttackIds();
  }, [clearHandledAttackIds]);

  return {
    isConnected,
    isItemAnimation,
    attackInfo,
    isAddItem,
    setIsAddItem,
    connectWebSocket,
    disconnectWebSocket,
    handleAnimationComplete,
    processNextAttackInQueue,
  };
};
