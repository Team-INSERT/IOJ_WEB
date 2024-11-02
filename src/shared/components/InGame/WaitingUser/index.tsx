import WaitingCharacter from "@/assets/WaitingCharacter";
import * as S from "./style";
import { theme } from "@/shared/style";

interface Details {
  UserName: string;
  color: string;
}

const colorMapping: { [key: string]: string } = {
  BLUE: theme.BLUE, // "#6B71FF"
  PINK: theme.PINK, // "#FF6AC3"
  RED: theme.RED, // "#FF6B6B"
  PURPLE: theme.PURPLE, // "#C446EE"
  NEON: theme.NEON, // "#65EE83"
  ORANGE: theme.ORANGE, // "#FF984D"
  SKYBLUE: theme.SKYBLUE, // "#5CE2FF"
  gray: theme.grey200,
};

const WaitingUser = ({ UserName, color = "gray" }: Details) => {
  const characterColor = colorMapping[color] || colorMapping.gray;

  return (
    <S.Layout>
      {UserName && <WaitingCharacter color={characterColor} />}
      <S.UserName>{UserName}</S.UserName>
    </S.Layout>
  );
};

export default WaitingUser;
