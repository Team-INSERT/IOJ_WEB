import { flex, Pretendard, theme } from "@/shared/style";
import styled from "styled-components";

export const Layout = styled.div`
  ${flex.FLEX}
  gap: 7px;
`;

export const Icon = styled.span`
  ${Pretendard.BigTitle}
`;

interface TextProps {
  status: string;
}

export const Text = styled.span<TextProps>`
  text-shadow:
    -1px 0 #fff,
    0 1px #fff,
    1px 0 #fff,
    0 -1px #fff;
  color: ${({ status }) =>
    status === "방어 성공" ? "blue" : theme.warningRed};
  ${Pretendard.BigText}
  margin-top: auto;
`;
