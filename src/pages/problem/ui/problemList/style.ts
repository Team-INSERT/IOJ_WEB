import styled from "styled-components";
import { flex, Pretendard, RobotoMono, theme } from "@/shared/style";

export const Main = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #F6F6F6;
`
export const Layout = styled.div`
  width: 100%;
  padding: 64px 88px;
  ${flex.COLUMN_VERTICAL};
  gap: 8px;
`;
export const DetailLayout = styled.div`
  ${flex.END}
  width: 100%;
`;
export const DetailInputs = styled.div`
  ${flex.END};
`;
export const SearchInput = styled.input`
  width: 400px;
  height: 36px;
  border-radius: 4px;
  border: 1px solid ${theme.grey200};
  padding: 9px 209px 9px 12px;
`;
export const ListLayout = styled.div`
  background-color: ${theme.white};
  width: 100%;
  border: 1px solid ${theme.grey200};
  border-radius: 4px;
`
export const ListHeader = styled.div`
  width: 100%;
  height: 40px;
  ${flex.START};
  border-bottom: 1px solid ${theme.grey200};
`
export const Attribute = styled.div`
  height: 100%;
  ${Pretendard.SmallText};
  color: ${theme.grey500};
  ${flex.CENTER};
  
  &:nth-child(1) {
    width: 14%;
  }
  &:nth-child(2) {
    width: 66%;
  }
  &:last-child {
    width: 20%;
  }
`
export const ListContent = styled.div`
  width: 100%;
`
export const ProblemLayout = styled.div`
  width: 100%;
  height: 40px;
  ${flex.START};
  border-bottom: 1px solid ${theme.grey200};
  
  &:last-child {
    border: none;
  }
`
export const ProblemData = styled.div`
  height: 100%;
  ${Pretendard.Text};
  color: ${theme.grey900};
  font-weight: 500;
  ${flex.CENTER};
  
  &:nth-child(1) {
    width: 14%;
    ${RobotoMono.Text};
  }
  &:nth-child(2) {
    width: 66%;
    justify-content: start;
  }
  &:last-child {
    width: 20%;
  }
`