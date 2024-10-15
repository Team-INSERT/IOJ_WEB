import styled from "styled-components";
import { NexonFont, flex } from "@/shared/style";

export const Layout = styled.div<{ width: number }>`
  padding: 12px 0 8px 0;
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  width: ${({ width }) => `${width}px`};
  height: ${({ width }) => `${width}px`};
  border-radius: 4px;
  ${flex.COLUMN_CENTER}
  cursor: pointer;
  padding: 5px;

  &:hover {
    border: 5px solid;
    border-image: linear-gradient(180deg, #fff2af, #ff48ab) 1;
    padding: 0px;
  }
`;

export const PinkLayout = styled.div`
  position: absolute;
  bottom: 53%;
  right: 10%;
  width: 130%;
  height: 100%;
  transform: rotate(-33.306deg);
  flex-shrink: 0;
  background: linear-gradient(
    180deg,
    rgba(255, 72, 171, 0.15) 0%,
    rgba(255, 72, 171, 0) 100%
  );
  backdrop-filter: blur(2px);
`;
export const BlueLayout = styled.div`
  position: absolute;
  width: 130%;
  height: 100%;
  top: 43%;
  left: 20%;
  transform: rotate(-33.306deg);
  flex-shrink: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 146, 255, 0) 0%,
    rgba(0, 146, 255, 0.2) 100%
  );
  backdrop-filter: blur(2px);
`;

export const UserName = styled.div<{ smallFont: boolean }>`
  ${NexonFont.NexonText}
  padding-top: 7px;
  z-index: 1;
  ${({ smallFont }) => (smallFont ? NexonFont.NexonCaption : "none")};
`;
