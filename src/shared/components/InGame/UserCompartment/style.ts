import styled from "styled-components";
import InGameUserPartment from "@/assets/InGameUserPartment.svg";
import InGameHoverUserPartment from "@/assets/InGameHoverUserPartment.svg";
import { NexonFont, flex } from "../../../style";

export const Layout = styled.div`
  background-image: url(${InGameUserPartment});
  width: 148px;
  height: 148px;
  border-radius: 4px;
  ${flex.COLUMN_CENTER}
  cursor: pointer;
  &:hover {
    background-image: url(${InGameHoverUserPartment});
  }
`;
export const UserName = styled.div`
  ${NexonFont.NexonCaption}
  padding-top: 7px;
`;
