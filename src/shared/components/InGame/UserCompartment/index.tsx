import Character from "@/assets/Character";
import * as S from "./style";

interface Details {
  UserName: string;
  color: string;
}

const UserCompartment = ({ UserName, color }: Details) => (
  <S.Layout>
    <Character color={color} />
    <S.UserName>{UserName}</S.UserName>
  </S.Layout>
);

export default UserCompartment;
