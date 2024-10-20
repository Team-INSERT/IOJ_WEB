import { Button, Room } from "@/shared/components";
import { useState, useEffect } from "react";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rooms, setRooms] = useState<RoomData[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomData = await roomList();
        setRooms(roomData);
      } catch (error) {
        console.error("방 목록을 가져오는 데 실패했습니다:", error);
      }
    };

    fetchRooms();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
        {rooms.map((room) => (
          <Room
            key={room.id}
            id={room.id}
            title={room.title}
            maxPeople={room.maxPeople}
            currentPeople={0}
            time={room.time}
            minDifficulty={room.minDifficulty}
            maxDifficulty={room.maxDifficulty}
            problem={room.problem}
          />
        ))}
      </S.GameList>
      {isModalOpen && <CreateRoomModal onClose={closeModal} />}
    </S.GameFindLayout>
  );
};
