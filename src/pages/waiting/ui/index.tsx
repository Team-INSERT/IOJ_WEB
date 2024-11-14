import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { WaitingUser, Button, ErrorModal } from "@/shared/components";
import GameRankBlue from "@/assets/GameRankBlue";
import GameRankGrey from "@/assets/GameRankGrey";
import Close from "@/assets/close.svg";
import { useWaitingRoom } from "@/shared/hooks/useWaitingRoom";
import { fetchUserData } from "@/shared/utils/auth/authService";
import { getGameDetails } from "@/pages/game/api/getGameDetails";
import useModal from "@/shared/hooks/useModal";
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

export const Waiting = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const roomId = location.state?.roomId;
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [room, setRoom] = useState<RoomData | null>(null);
  const {
    users: websocketUsers,
    isConnected,
    connectWebSocket,
    disconnectWebSocket,
    sendEvent,
    initializeUsers,
    roomStatus,
  } = useWaitingRoom(roomId || "");
  const [isReady, setIsReady] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [problemId, setProblemId] = useState<number | null>(null);

  const handleErrorWithNavigation = (error: any) => {
    const code = error?.response?.data?.code;

    if (code === "ROOM-404-2") {
      setErrorMessage("방 안에 유저가 존재하지 않습니다.");
      navigate("/game/find");
    } else if (code === "HOST-400-2") {
      setErrorMessage("호스트는 방에서 떠날 수 없습니다.");
      navigate(`/game/room/${roomId}`);
    } else if (code === "ROOM-400-4") {
      setErrorMessage("이미 게임을 시작한 방입니다.");
      navigate(`/game/find`);
    } else if (code === "HOST-400-1") {
      setErrorMessage("호스트는 준비상태 변경이 불가능합니다.");
    } else if (code === "USER-404-1") {
      setErrorMessage("요청한 사용자가 존재하지 않습니다.");
      navigate("/game/find");
    } else if (code === "ROOM-400-3") {
      setErrorMessage("방에 준비를 하지 않은 유저가 있습니다.");
    } else {
      setErrorMessage("알 수 없는 에러가 발생했습니다.");
      navigate("/game/find");
    }
  };

  useEffect(() => {
    (async () => {
      try {
        if (roomId) {
          const roomDetails = await roomDetail(roomId);
          setRoom(roomDetails);

          initializeUsers(roomDetails.users);

          const hostUser = roomDetails.users.find(
            (user: { host: boolean }) => user.host,
          );

          const currentUser = await fetchUserData();
          setIsHost(hostUser?.nickname === currentUser.nickname);

          const currentUserInRoom = roomDetails.users.find(
            (user: { nickname: any }) => user.nickname === currentUser.nickname,
          );
          if (currentUserInRoom) {
            setIsReady(currentUserInRoom.ready);
          }

          connectWebSocket();

          if (!currentUserInRoom) {
            const enterResponse = await enter(roomId);
            sendEvent("/app/join", {
              roomId,
              nickname: currentUser.nickname,
              color: enterResponse.color,
              ready: currentUserInRoom?.ready || false,
            });
          }
        }
      } catch (error: any) {
        handleErrorWithNavigation(error);
        console.error("방 정보를 가져오는데 실패했습니다:", error);
      }
    })();

    return () => {
      if (room && roomId) {
        leave(roomId);
        disconnectWebSocket();
      }
    };
  }, [roomId, connectWebSocket, disconnectWebSocket, initializeUsers]);

  useEffect(() => {
    if (websocketUsers.length > 0) {
      setRoom((prev) =>
        prev
          ? {
              ...prev,
              users: websocketUsers,
            }
          : null,
      );
    }
  }, [websocketUsers]);

  useEffect(() => {
    if (roomStatus === "started" && roomId) {
      (async () => {
        const gameDetails = await getGameDetails(roomId);
        const firstProblem = gameDetails.problems[0];
        setProblemId(firstProblem);
      })();
    }
  }, [roomStatus, roomId]);

  useEffect(() => {
    if (problemId) {
      navigate(`/game/${roomId}/code/${problemId}`);
    }
  }, [problemId, roomId, navigate]);

  const handleReady = async () => {
    if (room && roomId) {
      try {
        await ready(roomId);
        const newReadyState = !isReady;
        setIsReady(newReadyState);

        sendEvent("/app/ready", {
          roomId,
          ready: newReadyState,
          nickname: localStorage.getItem("nickname"),
        });

        setRoom((prev) => {
          if (!prev) return null;
          const currentUserNickname = localStorage.getItem("nickname");
          return {
            ...prev,
            users: prev.users.map((user) =>
              user.nickname === currentUserNickname
                ? { ...user, ready: newReadyState }
                : user,
            ),
          };
        });
      } catch (error: any) {
        handleErrorWithNavigation(error);
        console.error("준비 상태 변경 중 에러 발생:", error);
      }
    }
  };

  const handleStart = async () => {
    if (isHost && room && roomId) {
      try {
        await start(roomId);
        sendEvent("/app/start", { roomId });
      } catch (error: any) {
        handleErrorWithNavigation(error);
      }
    }
  };

  const handleDelete = async () => {
    if (isHost && room && roomId) {
      try {
        await deleteRoom(roomId);
        sendEvent("/app/delete", { roomId });
        navigate("/game/find");
      } catch (error: any) {
        handleErrorWithNavigation(error);
      }
    }
  };

  const handleLeave = async () => {
    if (room && roomId) {
      try {
        await leave(roomId);

        sendEvent("/app/leave", {
          roomId,
          nickname: localStorage.getItem("nickname"),
        });

        disconnectWebSocket();

        navigate("/game/find");
      } catch (error: any) {
        handleErrorWithNavigation(error);
        console.error("방 나가기 실패:", error);
      }
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
          const sortedUsers = [...room.users].sort((a, b) => (a.host ? -1 : 1));
          const user = sortedUsers[index];
          const isUserSlot = index < room.maxPeople;

          return (
            <S.UserCompartmentBox key={user?.nickname || `empty-${index}`}>
              {isUserSlot ? (
                user ? (
                  <WaitingUser
                    UserName={user.nickname}
                    color={user.color}
                    isReady={!user.host && user.ready}
                    isHost={user?.host}
                  />
                ) : (
                  <WaitingUser
                    UserName=""
                    color=""
                    isReady={false}
                    isHost={false}
                  />
                )
              ) : (
                <S.Close src={Close} alt="close" />
              )}
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
              color="glowRed"
              font="nexon"
              onClick={handleLeave}
            >
              방 나가기
            </Button>
            <Button
              mode="big"
              color={isReady ? "green" : "green"}
              font="nexon"
              onClick={handleReady}
            >
              {isReady ? "준비취소" : "준비하기"}
            </Button>
          </>
        )}
      </S.ButtonBox>

      {errorMessage && (
        <ErrorModal
          errorMessage={errorMessage}
          onClose={() => setErrorMessage(null)}
        />
      )}
    </S.Layout>
  );
};
