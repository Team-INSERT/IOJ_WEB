import styled from "styled-components";
import InGameUserPartment from "@/assets/InGameUserPartment.svg";
import InGameHoverUserPartment from "@/assets/InGameHoverUserPartment.svg";
import { NexonFont, flex } from "@/shared/style";

export const Layout = styled.div<{ width: number }>`
  background-image: url(${InGameUserPartment});
  width: ${({ width }) => `${width}px`};
  height: ${({ width }) => `${width}px`};
  border-radius: 4px;
  ${flex.COLUMN_CENTER}
  cursor: pointer;
  &:hover {
    background-image: url(${InGameHoverUserPartment});
  }
`;

export const UserName = styled.div`
  ${NexonFont.NexonText}
  padding-top: 7px;
`;
