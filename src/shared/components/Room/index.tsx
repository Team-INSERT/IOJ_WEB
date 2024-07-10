import * as S from "./style";
import Contest from "../../../assets/Contest.svg";
import Customization from "../../../assets/Customization.svg";

interface RoomProps {
  link: string;
  category: string;
  roomNumber: number;
  roomTitle: string;
  mode: string;
  gameUserCount: string;
  userCount: string;
  time: number;
  level: string;
}

const Room = ({
  link,
  category,
  roomNumber,
  roomTitle,
  mode,
  gameUserCount,
  userCount,
  time,
  level,
}: RoomProps) => {
  const formattedRoomNumber = roomNumber.toString().padStart(3, "0");
  const backgroundImage = category === "contest" ? Contest : Customization;

  return (
    <S.Layout backgroundImage={backgroundImage} category={category}>
      <S.Number category={category}>{formattedRoomNumber}</S.Number>
      <S.Line />
      <S.Details>
        <S.Title>{roomTitle}</S.Title>
        <S.CartegoryNumber>
          <S.DarkGrayFont>{mode}</S.DarkGrayFont>/
          <S.DarkGrayFont>{gameUserCount}</S.DarkGrayFont>/
          <S.DarkGrayFont>{userCount}</S.DarkGrayFont>
        </S.CartegoryNumber>
        <S.TimeLevel>
          <S.DarkGrayFont>{time}분</S.DarkGrayFont>/
          <S.DarkGrayFont>{level}⭐️</S.DarkGrayFont>
        </S.TimeLevel>
      </S.Details>
    </S.Layout>
  );
};

export default Room;
