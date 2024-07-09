import styled, { css } from "styled-components";
import UserCompartment from "../../../assets/UserCompartment.svg";
import NoneUser from "../../../assets/NoneUser.svg";
import { NexonFont, flex } from "../../style";

interface LayoutProps {
  status: string;
}

export const Layout = styled.div<LayoutProps>`
  background-size: cover;
  width: 248px;
  height: 248px;
  ${flex.COLUMN_FLEX}
  padding: 10px;
  ${flex.VERTICAL}
  ${({ status }) =>
    status === "none"
      ? css`
          background-image: url(${NoneUser});
        `
      : css`
          background-image: url(${UserCompartment});
          position: relative;
        `}
`;

export const No = styled.div`
  ${flex.FLEX}
  margin-left: auto;
  cursor: pointer;
`;

export const DotBox = styled.div`
  width: 70%;
  height: 73%;
  border: dotted;
  ${flex.CENTER}
`;

export const UserName = styled.div`
  ${NexonFont.NexonText}
  padding-top: 11px;
`;

export const Crown = styled.div`
  position: absolute;
  top: 0;
`;
