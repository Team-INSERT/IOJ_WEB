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
`;

export const NoShildText = styled.span`
  ${Pretendard.BigText}
  text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;
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
