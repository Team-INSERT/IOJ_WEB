import styled from "styled-components";
import { Pretendard, theme, flex } from "@/shared/style";

interface TabProps {
  active: boolean;
}

export const Container = styled.div`
  ${flex.COLUMN_FLEX}
  width: 100%;
  color: white;
  overflow-x: hidden;
  background-color: ${theme.black};
`;

export const TabContainer = styled.div`
  ${flex.FLEX};
  background-color: ${theme.grey900};
  position: fixed;
  width: 100%;
  z-index: 1;
`;

export const Tab = styled.div<TabProps>`
  padding: 12px 20px;
  color: ${({ active }) => (active ? "white" : "#999")};
  font-size: 16px;
  cursor: pointer;
  border-bottom: ${({ active }) => (active ? "2px solid white" : "none")};
`;

export const Content = styled.div`
  padding: 60px 20px 20px 20px;
  flex-grow: 1;
`;

export const Text = styled.p`
  ${Pretendard.SmallText}
  margin-bottom: 2%;
`;

export const ExecuteResult = styled.div`
  ${Pretendard.SmallText}
`;

export const TestCasesHeader = styled.h2`
  ${Pretendard.SmallText}
  margin-bottom: 10px;
`;

export const TestBox = styled.div`
  ${flex.BETWEEN}
`;

export const TestCasesNote = styled.p`
  ${Pretendard.Caption}
  margin-bottom: 16px;
  font-weight: 400;
  background: ${theme.grey800};
  border-radius: 5px;
  padding: 2%;
`;

export const Button = styled.div`
  ${flex.END}
`;

export const ScrollLayout = styled.div`
  overflow-x: auto;
`;

export const Table = styled.table`
  width: auto;
  min-width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  background-color: ${theme.grey900};
  overflow: auto;
`;

export const TableHead = styled.thead`
  background-color: ${theme.grey900};
`;

export const TableBody = styled.tbody``;

export const TableHeadRow = styled.tr`
  background-color: ${theme.grey900};
`;

export const TableRow = styled.tr`
  background-color: black;
`;

export const TableHeader = styled.th`
  padding: 10px;
  font-weight: 400;
  color: ${theme.white};
  text-align: left;
  font-size: 12px;
  white-space: nowrap;
`;

export const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #555;
  font-size: 12px;
  color: ${theme.white};
  word-break: break-word;
`;

export const StyledSpan = styled.span`
  color: ${theme.insertBlue};
`;

export const ResultBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

export const ResultBox = styled.div`
  padding: 16px;
  background-color: ${theme.grey800};
  color: ${theme.white};
  border-radius: 4px;
`;

export const ScrollableSection = styled.div`
  max-height: 100%;
  overflow-y: auto;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 32px;
`;
