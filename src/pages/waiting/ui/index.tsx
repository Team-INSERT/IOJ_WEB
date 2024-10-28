import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { WaitingUser, Button } from "@/shared/components";
import GameRankBlue from "@/assets/GameRankBlue";
import GameRankGrey from "@/assets/GameRankGrey";
import Ready from "@/assets/Ready.svg";
import { useWaitingRoom } from "@/hooks/useWaitingRoom";
import { fetchUserData } from "@/shared/utils/auth/authService";
import {
  roomDetail,
  enter,
  leave,
  ready,
  start,
  deleteRoom,
} from "../api/enter";
import * as S from "./style";

interface User {
  nickname: string;
  color: string;
  ready: boolean;
  host: boolean;
}

interface RoomData {
  title: string;
  time: number;
  maxPeople: number;
  users: User[];
}

export const Waiting: React.FC = () => {
  const { roomNumber } = useParams<{ roomNumber: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const roomId = location.state?.roomId;

  const [room, setRoom] = useState<RoomData | null>(null);
  const { isConnected, connectWebSocket, disconnectWebSocket, sendEvent } =
    useWaitingRoom(roomId || "");
  const [isReady, setIsReady] = useState(false);
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        if (roomId) {
          const roomDetails = await roomDetail(roomId);
          console.log("Room Details:", roomDetails);
          setRoom(roomDetails);

          const hostUser = roomDetails.users.find(
            (user: { host: boolean }) => user.host === true,
          );

          const currentUser = await fetchUserData();
          setIsHost(hostUser?.nickname === currentUser.nickname);

          connectWebSocket();
          await enter(roomId);
        }
      } catch (error) {
        console.error("방 정보를 가져오는데 실패했습니다:", error);
      }
    };

    fetchRoom();

    return () => {
      if (room && roomId) {
        leave(roomId);
        disconnectWebSocket();
      }
    };
  }, [roomId, connectWebSocket, disconnectWebSocket]);

  const handleReady = async () => {
    if (room && roomId) {
      await ready(roomId);
      setIsReady(!isReady);
      sendEvent("/app/ready", { roomId, ready: !isReady });
    }
  };

  const handleStart = async () => {
    if (isHost && room && roomId) {
      await start(roomId);
      sendEvent("/app/start", { roomId });
    }
  };

  const handleDelete = async () => {
    if (isHost && room && roomId) {
      await deleteRoom(roomId);
      sendEvent("/app/delete", { roomId });
      navigate("/game/find");
    }
  };

  const handleLeave = async () => {
    if (room && roomId) {
      await leave(roomId);
      sendEvent("/app/leave", { roomId });
      navigate("/game/find");
    }
  };

  if (!isConnected || !room) {
    return <div>연결 중...</div>;
  }

  return (
    <S.Layout>
      <S.BlueBg>
        <GameRankBlue />
      </S.BlueBg>
      <S.GreyBg>
        <GameRankGrey />
      </S.GreyBg>
      <S.TitleBox>
        <S.Title>{`${room.title}`}</S.Title>
        <S.Content>{`아이템전 / ${room.maxPeople}명 중 ${room.users.length}명 / ${room.time}분`}</S.Content>
      </S.TitleBox>
      <S.UserCompartmentContainer>
        {Array.from({ length: 8 }).map((_, index) => {
          const user = room.users[index];
          return (
            <S.UserCompartmentBox key={user?.nickname || `empty-${index}`}>
              <WaitingUser
                UserName={user?.nickname || ""}
                color={user?.color || "gray"}
              />
              {user?.ready && <S.Ready src={Ready} />}
            </S.UserCompartmentBox>
          );
        })}
      </S.UserCompartmentContainer>
      <S.ButtonBox>
        {isHost ? (
          <>
            <Button
              mode="big"
              color="glowRed"
              font="nexon"
              onClick={handleDelete}
            >
              방 삭제하기
            </Button>
            <Button mode="big" color="blue" font="nexon" onClick={handleStart}>
              게임시작
            </Button>
          </>
        ) : (
          <>
            <Button
              mode="big"
              color={isReady ? "glowRed" : "blue"}
              font="nexon"
              onClick={handleReady}
            >
              {isReady ? "준비 취소" : "준비하기"}
            </Button>
            <Button
              mode="big"
              color="glowRed"
              font="nexon"
              onClick={handleLeave}
            >
              방 나가기
            </Button>
          </>
        )}
      </S.ButtonBox>
    </S.Layout>
  );
};
