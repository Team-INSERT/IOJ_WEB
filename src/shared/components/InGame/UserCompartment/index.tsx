import Character from "@/assets/Character";
import * as S from "./style";

interface Details {
  UserName: string;
  layoutWidth?: number;
  width?: number;
  color?: string;
  smallFontSize?: boolean;
}

const UserCompartment = ({
  layoutWidth = 240,
  UserName,
  width,
  color,
  smallFontSize = true,
}: Details) => (
  <S.Layout width={layoutWidth}>
    <S.PinkLayout />
    <S.BlueLayout />
    <Character characterColor={color} width={width} />
    <S.UserName smallFont={smallFontSize}>{UserName}</S.UserName>
  </S.Layout>
);

export default UserCompartment;
