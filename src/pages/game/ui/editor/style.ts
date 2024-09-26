import styled from "styled-components";
import { Pretendard, theme, flex } from "@/shared/style";

export const EditorLayout = styled.div`
  background-color: #1e1e1e;
  ${flex.COLUMN_FLEX};
  width: 50%;
  height: 100vh;
  overflow: hidden;
`;

export const FileName = styled.div`
  ${Pretendard.Text};
  color: ${theme.white};
  font-weight: 600;
  padding: 0 20px 12px 20px;
  border-bottom: 2px solid white;
`;

export const HeaderBox = styled.div`
  ${flex.BETWEEN}
`;

export const ButtonBox = styled.div`
  width: 100%;
  ${flex.END}
  padding: 20px;
`;
export const Button = styled.div`
  margin-left: 1%;
`;

export const TestBoxLayout = styled.div`
  ${flex.COLUMN_FLEX}
  background-color: ${theme.black};
  height: 16rem;
  overflow: auto;
  z-index: 5;
  position: fixed;
  bottom: 0;
  width: 50%;
`;
