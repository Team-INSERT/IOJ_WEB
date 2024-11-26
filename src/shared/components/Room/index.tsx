import Contest from "@/assets/Contest.svg";
import Customization from "@/assets/Customization.svg";
import * as S from "./style";

interface RoomProps {
  id: string;
  title: string;
  maxPeople: number;
  problem: number;
  minDifficulty: number;
  maxDifficulty: number;
  time: number;
  currentPeople?: number;
  category?: string;
  onClick?: () => void;
  roomNumber: string;
}

const Room = ({
  id,
  title,
  maxPeople,
  problem,
  minDifficulty,
  maxDifficulty,
  time,
  currentPeople = 0,
  category = "customization",
  onClick,
  roomNumber,
}: RoomProps) => {
  const backgroundImage = category === "contest" ? Contest : Customization;

  return (
    <S.Layout
      backgroundImage={backgroundImage}
      category={category}
      onClick={onClick}
    >
      <S.Number category={category}>{roomNumber}</S.Number>
      <S.Line />
      <S.Details>
        <S.Title>{title}</S.Title>
        <S.CartegoryNumber>
          <S.Grey700Font>아이템전 <S.Grey400Font>/</S.Grey400Font> 개인전 <S.Grey400Font>/</S.Grey400Font> {maxPeople}명</S.Grey700Font>
        </S.CartegoryNumber>
        <S.TimeLevel>
          <S.Grey700Font>{time}분</S.Grey700Font>
          <S.Grey400Font>/</S.Grey400Font>
          <S.Grey700Font>
            {minDifficulty}-{maxDifficulty}⭐️
          </S.Grey700Font>
        </S.TimeLevel>
      </S.Details>
    </S.Layout>
  );
};

export default Room;
