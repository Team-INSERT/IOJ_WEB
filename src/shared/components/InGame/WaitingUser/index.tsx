import WaitingCharacter from "@/assets/WaitingCharacter";
import { theme } from "@/shared/style";
import Ready from "@/assets/Ready.svg"
import * as S from "./style";

interface Details {
  UserName: string;
  color: string;
  isReady: boolean;
}

const colorMapping: { [key: string]: string } = {
  BLUE: theme.BLUE,
  PINK: theme.PINK,
  RED: theme.RED,
  PURPLE: theme.PURPLE,
  NEON: theme.NEON,
  ORANGE: theme.ORANGE,
  SKYBLUE: theme.SKYBLUE,
  gray: theme.grey200,
};

const WaitingUser = ({ UserName, color = "gray", isReady }: Details) => {
  const characterColor = colorMapping[color] || colorMapping.gray;

  return (
    <S.Layout>
      {UserName && <WaitingCharacter color={characterColor} />}
      <S.UserName>{UserName}</S.UserName>
      {isReady && <S.Ready src={Ready} />}
    </S.Layout>
  );
};

export default WaitingUser;
