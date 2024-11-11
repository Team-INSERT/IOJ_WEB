import { Button, Modal, Room } from "@/shared/components";
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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [rooms, setRooms] = useState<RoomData[]>([]);
  const { ModalWrapper, openModal, closeModal } = useModal();

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

  const openCreateModal = () => setIsModalOpen(true);
  const closeCreateModal = () => {
    setIsModalOpen(false);
    fetchRooms();
  };

  const formatRoomNumber = (index: number) =>
    (index + 1).toString().padStart(3, "0");

  const handleRoomClick = async (room: RoomData, index: number) => {
    try {
      const res = await roomJoin(room.id);
      if (res.maxPeople === res.users.length) {
        await openModal();
      } else {
        navigate(`/game/waiting/${room.id}`, {
          state: {
            roomNumber: formatRoomNumber(index),
            roomId: room.id,
          },
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <S.GameFindLayout>
      <S.Title>게임찾기</S.Title>
      <S.FindCreateGame>
        <S.FindGame placeholder="방 제목을 입력하세요." />
        <Button mode="small" color="blue" font="nexon" onClick={openCreateModal}>
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
      {isModalOpen && <CreateRoomModal onClose={closeCreateModal} />}
      <ModalWrapper>
        <TestModal status="나쁨" mode="알림" title="테스트 모달입니다." close={closeModal} />
      </ModalWrapper>
    </S.GameFindLayout>
  );
};
