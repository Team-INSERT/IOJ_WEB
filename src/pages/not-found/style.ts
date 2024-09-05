import { flex, Pretendard, theme } from "@/shared/style";
import styled from "styled-components";

export const ErrorBox = styled.div`
  height: 100vh;
  ${flex.CENTER}
`;
export const ErrorText = styled.p`
  ${flex.CENTER}
  color: ${theme.black};
  font-family: ${Pretendard.SmallTitle};
`;
