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
          <S.DarkGrayFont>{maxPeople}명</S.DarkGrayFont>
          {/* <S.DarkGrayFont>
            {maxPeople}명 중 {currentPeople}명
          </S.DarkGrayFont> */}
        </S.CartegoryNumber>
        <S.TimeLevel>
          <S.DarkGrayFont>{time}분</S.DarkGrayFont>/
          <S.DarkGrayFont>
            {minDifficulty}-{maxDifficulty}⭐️
          </S.DarkGrayFont>
        </S.TimeLevel>
      </S.Details>
    </S.Layout>
  );
};

export default Room;
