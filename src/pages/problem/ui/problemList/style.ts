import styled from "styled-components";
import SearchIcon from "@/assets/Search.svg";
import { flex, Pretendard, RobotoMono, theme } from "@/shared/style";

export const Main = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f6f6f6;
`;
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
  padding: 9px 40px 9px 12px;
  background: url(${SearchIcon}) no-repeat right 12px center;
  background-color: ${theme.white};
  ${Pretendard.SmallText};
  color: ${theme.grey800};

  &::placeholder {
    color: ${theme.grey400};
  }
`;
export const ListLayout = styled.div`
  background-color: ${theme.white};
  width: 100%;
  border: 1px solid ${theme.grey200};
  border-radius: 4px;
`;
export const ListHeader = styled.div`
  width: 100%;
  height: 40px;
  ${flex.START};
  border-bottom: 1px solid ${theme.grey200};
`;
export const Attribute = styled.div`
  height: 100%;
  ${Pretendard.SmallText};
  color: ${theme.grey500};
  ${flex.CENTER};

  &:nth-child(1) {
    width: 14%;
  }
  &:nth-child(2) {
    width: 45%;
  }
  &:nth-child(3) {
    width: 26%;
    justify-content: center;
  }
  &:last-child {
    width: 15%;
  }
`;
export const ListContent = styled.div`
  width: 100%;
`;
export const ProblemLayout = styled.div`
  width: 100%;
  height: 40px;
  ${flex.START};
  border-bottom: 1px solid ${theme.grey200};
  cursor: pointer;

  &:last-child {
    border: none;
  }
  &:hover {
    background-color: #f9f9f9;
  }
`;
export const ProblemData = styled.div`
  height: 100%;
  ${Pretendard.Text};
  color: ${theme.grey900};
  ${flex.CENTER};

  &:nth-child(1) {
    width: 14%;
    ${RobotoMono.Text};
  }
  &:nth-child(2) {
    width: 45%;
    justify-content: start;
  }
  &:nth-child(3) {
    width: 26%;
    justify-content: center;
    ${Pretendard.SmallText};
    font-weight: 500;
    color: ${theme.grey700};
  }
  &:last-child {
    width: 15%;
  }
`;
