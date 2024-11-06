import { Button, Room } from "@/shared/components";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./style";
import { CreateRoomModal } from "../createRoomModal";
import { roomList } from "../../api/roomApi";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rooms, setRooms] = useState<RoomData[]>([]);

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

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    fetchRooms();
  };

  const formatRoomNumber = (index: number) =>
    (index + 1).toString().padStart(3, "0");

  return (
    <S.GameFindLayout>
      <S.Title>게임찾기</S.Title>
      <S.FindCreateGame>
        <S.FindGame placeholder="방 제목을 입력하세요." />
        <Button mode="small" color="blue" font="nexon" onClick={openModal}>
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
            onClick={() => {
              navigate(`/game/waiting/${room.id}`, {
                state: {
                  roomNumber: formatRoomNumber(index),
                  roomId: room.id,
                },
              });
            }}
          />
        ))}
      </S.GameList>
      {isModalOpen && <CreateRoomModal onClose={closeModal} />}
    </S.GameFindLayout>
  );
};
