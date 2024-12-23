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
  position: relative;
  box-shadow: 0 0 8px 0 rgba(75, 75, 75, 0.1);
`;
export const UserName = styled.div`
  ${NexonFont.NexonText}
  padding-top: 7px;
`;
export const Ready = styled.img`
  position: absolute;
  bottom: 60px;
  right: 0;
  z-index: 2;
  width: auto;
  height: 30px;
`;

export const Crown = styled.div`
  position: absolute;
  top: 0;
`;
