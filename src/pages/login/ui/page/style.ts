import { Pretendard, flex, theme } from "@/shared/style";
import styled from "styled-components";

export const Layout = styled.div`
  top: 0;
  width: 100%;
  height: calc(100vh - 100px);
  background-color: ${theme.grey800};
  ${flex.COLUMN_CENTER}
`;
export const GoogleLayout = styled.div`
  ${flex.START}
  gap: 68px;
  background-color: ${theme.white};
  padding: 11px 105px 11px 12px;
  border-radius: 4px;
  border: 1px solid var(--grey-200, #d9d9d9);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  &:hover {
    background-color: ${theme.grey100};
  }
`;
export const Text = styled.p`
  ${Pretendard.SmallText}
`;