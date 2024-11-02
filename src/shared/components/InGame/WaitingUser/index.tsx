import WaitingCharacter from "@/assets/WaitingCharacter";
import * as S from "./style";
import { theme } from "@/shared/style";

interface Details {
  UserName: string;
  color: string;
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
