import styled from "styled-components";
import { Pretendard, theme, flex } from "../../../../shared/style";

export const EditorLayout = styled.div`
  background-color: #1e1e1e;
  ${flex.COLUMN_FLEX};
  width: 50%;
  height: 100%;
`;

export const FileName = styled.div`
  ${Pretendard.Text};
  color: ${theme.white};
  font-weight: 600;
`;

export const HeaderBox = styled.div`
  ${flex.BETWEEN}
  padding: 2% 2%;
`;

export const ButtonBox = styled.div`
  width: 100%;
  ${flex.END}
`;
export const Button = styled.div`
  margin-left: 1%;
`;

export const TestBox = styled.div`
  ${flex.FLEX}
  background-color: ${theme.black};
`;
