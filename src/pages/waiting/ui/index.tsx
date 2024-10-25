import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserCompartment, Button } from "@/shared/components";
import GameRankBlue from "@/assets/GameRankBlue";
import GameRankGrey from "@/assets/GameRankGrey";
import Ready from "@/assets/Ready.svg";
import { useWaitingRoom } from "@/hooks/useWaitingRoom";
import { enter, leave, ready, start, deleteRoom } from "../api/enter";
import * as S from "./style";

interface User {
  nickname: string;
  color: string;
  ready: boolean;
}

export const Waiting: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const {
    users,
    isConnected,
    connectWebSocket,
    disconnectWebSocket,
    sendEvent,
  } = useWaitingRoom(Number(roomId));
  const [isReady, setIsReady] = useState(false);
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    connectWebSocket();
    enter(Number(roomId)).then((response) => {
      setIsHost(response.isHost);
    });

    return () => {
      leave(Number(roomId));
      disconnectWebSocket();
    };
  }, [roomId, connectWebSocket, disconnectWebSocket]);

  const handleReady = async () => {
    await ready(Number(roomId));
    setIsReady(!isReady);
    sendEvent("/app/ready", { roomId: Number(roomId), ready: !isReady });
  };

  const handleStart = async () => {
    if (isHost) {
      await start(Number(roomId));
      sendEvent("/app/start", { roomId: Number(roomId) });
    }
  };

  const handleDelete = async () => {
    if (isHost) {
      await deleteRoom(Number(roomId));
      sendEvent("/app/delete", { roomId: Number(roomId) });
      navigate("/rooms");
    }
  };

  if (!isConnected) {
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
        <S.Title>제목입니다</S.Title>
        <S.Content>{`아이템전 / 12명 중 ${users.length}명 / 5분`}</S.Content>
      </S.TitleBox>
      <S.UserCompartmentContainer>
        {users.map((user) => (
          <S.UserCompartmentBox>
            <UserCompartment UserName={user.nickname} color={user.color} />
            {user.ready && <S.Ready src={Ready} />}
          </S.UserCompartmentBox>
        ))}
        {Array.from({ length: 8 - users.length }).map((_) => (
          <S.UserCompartmentBox>
            <UserCompartment UserName="" color="gray" />
          </S.UserCompartmentBox>
        ))}
      </S.UserCompartmentContainer>
      <S.ButtonBox>
        {isHost ? (
          <Button
            mode="big"
            color="glowRed"
            font="nexon"
            onClick={handleDelete}
          >
            방 삭제하기
          </Button>
        ) : (
          <Button
            mode="big"
            color={isReady ? "glowRed" : "blue"}
            font="nexon"
            onClick={handleReady}
          >
            {isReady ? "준비 취소" : "준비하기"}
          </Button>
        )}
        {isHost && (
          <Button mode="big" color="blue" font="nexon" onClick={handleStart}>
            게임시작
          </Button>
        )}
      </S.ButtonBox>
    </S.Layout>
  );
};
