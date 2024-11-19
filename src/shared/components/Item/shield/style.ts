import { flex } from "@/shared/style";
import styled from "styled-components";

interface HexagonProps {
  visible?: boolean;
  fadeOut?: boolean;
}

export const Layout = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

export const LeftContainer = styled.div`
  position: absolute;
  ${flex.COLUMN_FLEX}
  gap: 78px;
  top: -9%;
`;

export const RightContainer = styled.div`
  position: absolute;
  top: 30%;
  right: 0;
  gap: 78px;
  ${flex.COLUMN_FLEX}
  margin-left: auto;
`;

export const Row = styled.div`
  ${flex.FLEX}
  position: relative;
  gap: 5px;
`;

export const Row1 = styled(Row)`
  left: -25%;
  top: -20%;
`;

export const Row3 = styled.div`
  gap: 5px;
  ${flex.FLEX}
  position: relative;
`;

export const Row2 = styled(Row3)`
  right: -25%;
`;

export const Hexagon = styled.div<HexagonProps>`
  position: relative;
  width: 250px;
  height: 144.34px;
  background-image: linear-gradient(#d8d9f833, #898eff33);
  opacity: ${({ visible, fadeOut }) => (fadeOut ? 0 : visible ? 1 : 0)};
  transition:
    opacity 0.6s ease,
    visibility 0.6s ease;
  visibility: ${({ visible, fadeOut }) =>
    fadeOut || !visible ? "hidden" : "visible"};

  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 0;
    border-left: 125px solid transparent;
    border-right: 125px solid transparent;
  }

  &:before {
    bottom: 100%;
    border-bottom: 72.17px solid rgba(216, 217, 248, 0.2);
  }

  &:after {
    top: 100%;
    border-top: 72.17px solid rgba(137, 142, 255, 0.2);
  }
`;

export const NoShieldText = styled.div`
  position: absolute;
  top: 30%;
  left: 81%;
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
  z-index: 1;
`;
