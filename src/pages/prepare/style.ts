import { flex, Pretendard, theme } from "@/shared/style";
import styled from "styled-components";

export const ErrorBox = styled.div`
  height: 100vh;
  ${flex.COLUMN_CENTER}
`;

export const ErrorCode = styled.p`
  ${flex.CENTER}
  color: ${theme.black};
  margin-bottom: 1%;
  font-weight: 700;
  font-family: ${Pretendard.BigTitle};
`;

export const ErrorText = styled.p`
  ${flex.CENTER}
  color: ${theme.black};
  font-family: ${Pretendard.SmallTitle};
`;
