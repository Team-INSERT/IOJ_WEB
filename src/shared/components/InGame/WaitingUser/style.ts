import styled from "styled-components";
import InGameUserPartment from "@/assets/InGameUserParment.svg";
import { NexonFont, flex } from "@/shared/style";

export const Layout = styled.div`
  background-image: url(${InGameUserPartment});
  width: 240px;
  height: 240px;
  border-radius: 4px;
  ${flex.COLUMN_CENTER}
  cursor: pointer;
`;
export const UserName = styled.div`
  ${NexonFont.NexonText}
  padding-top: 7px;
`;
