import { Button, Room } from "@/shared/components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./style";
import { CreateRoomModal } from "../createRoomModal";
import { roomList, roomDetail } from "../../api/roomApi";

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
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await roomList();
        setRooms(res);
        if (res.length > 0) {
          setSelectedRoomId(res[0].id);
        }
      } catch (err) {
        console.error("방 목록을 가져오는 데 실패했습니다:", err);
      }
    })();
  }, []);

  useEffect(() => {
    if (selectedRoomId) {
      (async () => {
        try {
          const res = await roomDetail(selectedRoomId);
          console.log("Room detail:", res);
        } catch (err) {
          console.error("방 상세 정보를 가져오는 데 실패했습니다:", err);
        }
      })();
    }
  }, [selectedRoomId]);

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
            {...room}
            currentPeople={0}
            onClick={() => {
              setSelectedRoomId(room.id);
              navigate(`/game/waiting`);
            }}
          />
        ))}
      </S.GameList>
      {isModalOpen && <CreateRoomModal onClose={closeModal} />}
    </S.GameFindLayout>
  );
};
