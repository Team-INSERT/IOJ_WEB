import { Button, Room } from "@/shared/components";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import TestModal from "@/shared/components/TestModal";
import useModal from "@/shared/hooks/useModal";
import * as S from "./style";
import { CreateRoomModal } from "../createRoomModal";
import { roomJoin, roomList } from "../../api/roomApi";

interface RoomData {
  id: string;
  title: string;
  maxPeople: number;
  problem: number;
  minDifficulty: number;
  maxDifficulty: number;
  time: number;
}

export const GameFind = () => {
  const navigate = useNavigate();
  const { ModalWrapper, openModal, closeModal } = useModal();
  const {
    ModalWrapper: CreateRoomModalWrapper,
    openModal: openCreateRoomModal,
    closeModal: closeCreateRoomModal,
  } = useModal();

  const [rooms, setRooms] = useState<RoomData[]>([]);
  const [joinErrorMessage, setJoinErrorMessage] = useState<string>("");

  const fetchRooms = useCallback(async () => {
    try {
      const res = await roomList();
      setRooms(res);
    } catch (err) {
      console.error("방 목록을 가져오는 데 실패했습니다:", err);
    }
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  const formatRoomNumber = (index: number) =>
    (index + 1).toString().padStart(3, "0");

  const handleRoomClick = async (room: RoomData, index: number) => {
    try {
      await roomJoin(room.id);
      navigate(`/game/waiting/${room.id}`, {
        state: {
          roomNumber: formatRoomNumber(index),
          roomId: room.id,
        },
      });
    } catch (err: any) {
      setJoinErrorMessage(err.response?.data?.message);
      await openModal();
    }
  };

  return (
    <S.GameFindLayout>
      <S.TitleLayout>
        <S.Title>게임찾기</S.Title>
        <Button
          mode="small"
          color="red"
          font="pretendard"
          onClick={() => navigate(-1)}
        >
          뒤로가기
        </Button>
      </S.TitleLayout>
      <S.MainContents>
        <S.FindCreateGame>
          <S.FindGame placeholder="방 제목을 입력하세요." />
          <Button
            mode="small"
            color="blue"
            font="pretendard"
            onClick={openCreateRoomModal}
          >
            방 생성하기
          </Button>
        </S.FindCreateGame>
        <S.GameList>
          {rooms.map((room, index) => (
            <Room
              key={room.id}
              {...room}
              currentPeople={0}
              roomNumber={formatRoomNumber(index)}
              onClick={() => handleRoomClick(room, index)}
            />
          ))}
        </S.GameList>
      </S.MainContents>
      <CreateRoomModalWrapper>
        <CreateRoomModal close={closeCreateRoomModal} />
      </CreateRoomModalWrapper>
      <ModalWrapper>
        <TestModal
          status="나쁨"
          mode="알림"
          title={joinErrorMessage}
          close={closeModal}
        />
      </ModalWrapper>
    </S.GameFindLayout>
  );
};
