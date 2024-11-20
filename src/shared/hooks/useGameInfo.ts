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
  const [isShieldActive, setIsShieldActive] = useState<boolean>(false); // 추가된 상태
  const clientRef = useRef<Client | null>(null);
  const [receivedAttackQueue, setReceivedAttackQueue] = useState<AttackInfo[]>(
    [],
  );
  const handledAttackIds = useRef<Set<number>>(new Set());

  const clearHandledAttackIds = useCallback(() => {
    handledAttackIds.current.clear();
  }, []);

  const processNextAttackInQueue = useCallback(() => {
    if (
      isItemAnimation.current ||
      isShieldActive ||
      receivedAttackQueue.length === 0
    ) {
      return;
    }

    const nextItem = receivedAttackQueue.find(
      (item) => !handledAttackIds.current.has(item.attackItemId),
    );

    if (nextItem) {
      setAttackInfo(nextItem);
      isItemAnimation.current = true;

      try {
        getAttackStart(nextItem.attackItemId);
      } catch (error) {
        console.error("공격 시작 실패:", error);
        isItemAnimation.current = false;
      }
      setReceivedAttackQueue((prevQueue) =>
        prevQueue.filter((item) => item.attackItemId !== nextItem.attackItemId),
      );
    }
  }, [receivedAttackQueue, isShieldActive]);

  const handleAnimationComplete = useCallback(() => {
    if (!attackInfo) return;
    setReceivedAttackQueue((prevQueue) =>
      prevQueue.filter((item) => item.attackItemId !== attackInfo.attackItemId),
    );
    handledAttackIds.current.add(attackInfo.attackItemId);
    isItemAnimation.current = false;
    setAttackInfo(null);

    processNextAttackInQueue();
  }, [attackInfo, processNextAttackInQueue]);

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
    isItemAnimation,
    attackInfo,
    setAttackInfo,
    isAddItem,
    setIsAddItem,
    isShieldActive,
    setIsShieldActive,
    connectWebSocket,
    disconnectWebSocket,
    handleAnimationComplete,
    processNextAttackInQueue,
    setReceivedAttackQueue,
    handledAttackIds,
  };
};
