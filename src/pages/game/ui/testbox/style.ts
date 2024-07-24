import styled from "styled-components";
import { Pretendard, theme, flex } from "../../../../shared/style";

interface TabProps {
  active: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #222;
  color: white;
`;

export const TabContainer = styled.div`
  display: flex;
  background-color: #333;
`;

export const Tab = styled.div<TabProps>`
  padding: 10px 20px;
  color: white;
  cursor: pointer;
  border-bottom: ${({ active }) => (active ? "2px solid white" : "none")};
`;

export const Content = styled.div`
  padding: 20px;
  flex-grow: 1;
  overflow: auto;
`;

export const Text = styled.p`
  ${Pretendard.SmallText}
  margin-bottom: 2%;
`;

export const TestCasesHeader = styled.h2`
  ${Pretendard.SmallText}
  margin-bottom: 10px;
`;

export const TestCasesNote = styled.p`
  ${Pretendard.Caption}
  margin-bottom: 16px;
  font-weight: 400;
  background: #4d4d4d;
  border-radius: 5px;
  padding: 2%;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  background-color: #333;
  border: 1px solid #555;
`;

export const TableHead = styled.thead`
  background-color: #333;
`;

export const TableBody = styled.tbody``;

export const TableHeadRow = styled.tr`
  background-color: #333;
`;
export const TableRow = styled.tr`
  background-color: black;
`;

export const TableHeader = styled.th`
  padding: 10px;
  font-weight: 400;
  color: #fff;
  text-align: left;
  font-size: 12px;
  white-space: nowrap;
`;

export const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #555;
  font-size: 12px;
  color: #fff;
  word-break: break-word;
`;
