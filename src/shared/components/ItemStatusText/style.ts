import { flex, Pretendard, theme } from "@/shared/style";
import styled from "styled-components";

export const Layout = styled.div`
  ${flex.FLEX}
  gap: 7px;
`;
export const Icon = styled.span`
  ${Pretendard.BigTitle}
`;
export const Text = styled.span`
  text-shadow:
    -1px 0 #fff,
    0 1px #fff,
    1px 0 #fff,
    0 -1px #fff;
  color: ${theme.warningRed};
  ${Pretendard.BigText}
  margin-top: auto;
`;
