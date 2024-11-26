import BlueBg from "@/assets/BlueBg";
import GrayBg from "@/assets/GrayBg";
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
  onClick,
  roomNumber,
}: RoomProps) => (
  <S.Layout onClick={onClick}>
    <S.BlueBgLayout>
      <BlueBg />
    </S.BlueBgLayout>
    <S.GrayBgLayout>
      <GrayBg />
    </S.GrayBgLayout>
    <S.NumberLayout>
      <S.Number>{roomNumber}</S.Number>
    </S.NumberLayout>
    <S.Details>
      <S.Title>{title}</S.Title>
      <S.RoomInfoDetails>
        <S.CartegoryNumber>
          <S.Grey700Font>
            아이템전 <S.Grey400Font>/</S.Grey400Font> 개인전{" "}
            <S.Grey400Font>/</S.Grey400Font> {maxPeople}명
          </S.Grey700Font>
        </S.CartegoryNumber>
        <S.TimeLevel>
          <S.Grey700Font>{time}분 </S.Grey700Font>
          <S.Grey400Font>/ </S.Grey400Font>
          <S.Grey700Font>
            {minDifficulty}-{maxDifficulty}⭐️
          </S.Grey700Font>
        </S.TimeLevel>
      </S.RoomInfoDetails>
    </S.Details>
  </S.Layout>
);

export default Room;
