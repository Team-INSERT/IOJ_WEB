import Character from "@/assets/Character";
import * as S from "./style";

interface Details {
  UserName: string;
  layoutWidth?: number;
  width?: number;
  color?: string;
}

const UserCompartment = ({
  layoutWidth = 240,
  UserName,
  width,
  color,
}: Details) => (
  <S.Layout width={layoutWidth}>
    <S.PinkLayout />
    <S.BlueLayout />
    <Character color={color} width={width} />
    <S.UserName>{UserName}</S.UserName>
  </S.Layout>
);

export default UserCompartment;
