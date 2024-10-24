import { Pretendard, theme } from "@/shared/style";
import styled from "styled-components";

export const Layout = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export const LogoContainer = styled.div`
  position: absolute;
  transform-origin: center;
`;

export const NoShildText = styled.span`
  ${Pretendard.BigText}
  text-shadow: -1px 0 #fff, 0 1px #fff, 1px 0 #fff, 0 -1px #fff;
  color: ${theme.warningRed};
  position: absolute;
  top: 30%;
  left: 81%;

  & > span {
    text-shadow: none;
  }
`;

export const BigText = styled.span`
  ${Pretendard.BigTitle}
`;
