import WaitingCharacter from "@/assets/WaitingCharacter";
import * as S from "./style";

interface Details {
  UserName: string;
  color: string;
}

const WaitingUser = ({ UserName, color }: Details) => (
  <S.Layout>
    {UserName && <WaitingCharacter color={color} />}
    <S.UserName>{UserName}</S.UserName>
  </S.Layout>
);

export default WaitingUser;
