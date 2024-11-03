import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Stars from "@/shared/components/Stars";
import { ReactComponent as XBold } from "@/assets/XBold.svg";
import { createRoomApi, roomList } from "../../api/roomApi";
import * as S from "./style";

interface CreateRoomModalProps {
  onClose: () => void;
}

export interface createRoomProps {
  title: string;
  maxPeople: number;
  problem: number;
  minDifficulty: number;
  maxDifficulty: number;
  time: number;
}

export const CreateRoomModal = ({ onClose }: CreateRoomModalProps) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [maxPeople, setMaxPeople] = useState(0);
  const [problem, setProblem] = useState(0);
  const [minDifficulty, setMinDifficulty] = useState(0);
  const [maxDifficulty, setMaxDifficulty] = useState(0);
  const [time, setTime] = useState(3);

  const formatRoomNumber = (index: number) =>
    (index + 1).toString().padStart(3, "0");

  const onCreateRoomClick = async () => {
    const createRoomData: createRoomProps = {
      title,
      maxPeople,
      problem,
      minDifficulty,
      maxDifficulty,
      time,
    };

    try {
      await createRoomApi(createRoomData);
      const rooms = await roomList();
      const roomIndex = rooms.length - 1;

      if (roomIndex >= 0) {
        navigate(`/game/waiting/${roomIndex + 1}`, {
          state: {
            roomNumber: formatRoomNumber(roomIndex),
            roomId: rooms[roomIndex].id,
          },
        });
      } else {
        console.error("방 목록이 비어 있습니다.");
      }
      onClose();
    } catch (error) {
      console.error("방 생성 중 에러가 발생했습니다:", error);
    }
  };

  const container = [
    {
      id: 1,
      title: "방 이름",
      detail: (
        <S.RoomTitleInput
          placeholder="방 이름을 입력하세요 (최대 20글자)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      ),
    },
    {
      id: 2,
      title: "최대 인원 수",
      detail: (
        <S.RoomMaximumNumberInput
          type="number"
          placeholder="0"
          value={maxPeople}
          onChange={(e) => setMaxPeople(Number(e.target.value))}
        />
      ),
    },
    {
      id: 3,
      title: "문제 수",
      detail: (
        <S.RoomProblemInput
          type="number"
          placeholder="0"
          value={problem}
          onChange={(e) => setProblem(Number(e.target.value))}
        />
      ),
    },
    {
      id: 4,
      title: "문제 난이도",
      detail: (
        <S.StarContainer>
          <Stars value={minDifficulty} setting onChange={setMinDifficulty} /> ~
          <Stars value={maxDifficulty} setting onChange={setMaxDifficulty} />
        </S.StarContainer>
      ),
    },
    {
      id: 5,
      title: "게임 시간",
      detail: (
        <S.GameTimeInput
          type="number"
          placeholder="0"
          min="3"
          max="60"
          value={time}
          onChange={(e) => setTime(Number(e.target.value))}
        />
      ),
    },
  ];

  return (
    <S.Overlay>
      <S.ModalContainer>
        <S.Header>
          <S.Title>방 생성하기</S.Title>
          <S.No onClick={onClose}>
            <XBold />
          </S.No>
        </S.Header>
        {container.map((detail) => (
          <S.InputContainer key={detail.id}>
            <S.InputContainerTitle>{detail.title}</S.InputContainerTitle>
            {detail.detail}
          </S.InputContainer>
        ))}
        <S.CreateButton onClick={onCreateRoomClick}>생성하기</S.CreateButton>
      </S.ModalContainer>
    </S.Overlay>
  );
};
