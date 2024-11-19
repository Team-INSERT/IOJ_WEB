import styled from "styled-components";
import { Pretendard, flex, theme } from "@/shared/style";

export const Layout = styled.table`
  border-collapse: collapse;
  border: 1px solid ${theme.grey200};
`;

export const Tr = styled.tr`
  ${Pretendard.Caption}
`;

const Td = styled.td`
  border: 1px solid ${theme.grey200};
  padding: 8px;
  text-align: left;
`;

export const SubmitNumber = styled(Td)`
  width: 52px;
  color: ${theme.black};
`;
export const UserName = styled(Td)`
  width: 84px;
  color: ${theme.blueDark};
`;
export const QuestionNumber = styled(Td)`
  width: 64px;
  color: ${theme.blueDark};
`;
export const Result = styled(Td)<{ color?: string }>`
  width: 204px;
  font-weight: bold;
  color: ${(props) => props.color || "inherit"};
`;
export const Memory = styled.td`
  padding: 8px;
  ${flex.FLEX}
  width: 64px;
  gap: 3px;
`;
export const RedText = styled.span`
  color: red;
`;
export const Time = styled(Td)`
  width: 84px;
`;
export const UseLanguage = styled(Td)`
  width: 64px;
`;
export const CodeLength = styled.td`
  ${flex.FLEX}
  width: 64px;
  gap: 3px;
  padding: 8px;
`;
export const SubmitTime = styled(Td)`
  width: 64px;
  color: ${theme.blueDark};
`;
