import { Pretendard, flex, theme } from "@/shared/style";
import { RobotoMono } from "@/shared/style/font";
import styled from "styled-components";

export const Layout = styled.div`
  width: 100%;
  padding: 48px 88px 60px 88px;
`;
export const ProblemHeader = styled.div`
  ${flex.COLUMN_FLEX}
  gap: 4px;
`;
export const ProblemNum = styled.p`
  color: ${theme.grey600};
  ${Pretendard.SmallTitle}
`;
export const ProblemTitle = styled.p`
  color: ${theme.grey900};
  ${Pretendard.Title}
`;
export const TitleAndLimit = styled.div`
  ${flex.BETWEEN}
  align-items: end;
`;

export const EditButtonContainer = styled.div`
  ${flex.FLEX}
  gap: 12px;
`;

export const EditTextarea = styled.textarea`
  ${Pretendard.Text}
  width: 100%;
  min-height: 120px;
  padding: 12px;
  border: 1px solid ${theme.grey300};
  border-radius: 4px;
  resize: vertical;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: ${theme.insertBlue};
  }
`;
export const LimitLayout = styled.div`
  ${flex.FLEX}
  gap: 12px;
`;
export const Detail = styled.p`
  ${Pretendard.SmallText}
  font-weight: 500;
`;
export const BlueText = styled.span`
  color: ${theme.insertBlue};
`;
export const HeaderLine = styled.hr`
  height: 1px;
  border: none;
  background-color: ${theme.grey300};
  margin-top: 8px;
`;
export const ContentLayout = styled.div`
  ${flex.COLUMN_VERTICAL}
  gap: 44px;
  width: 100%;
  margin-top: 36px;
`;
export const ProblemLayout = styled.div`
  ${flex.COLUMN_VERTICAL}
  align-items: start;
  gap: 16px;
  width: 100%;
`;
export const Problem = styled.p`
  ${Pretendard.BigText}
  color: ${theme.grey800};
  font-weight: 500;
  border-bottom: 2px solid ${theme.insertBlue};
  z-index: 1;
`;
export const GreyLine = styled.div`
  width: 100%;
  border-bottom: 2px solid ${theme.grey200};
  position: absolute;
  bottom: 0;
`;
export const SubTitleLayout = styled.div`
  width: 100%;
  ${flex.FLEX}
  position: relative;
`;
export const ProblemInfo = styled.p<{ isSource: boolean }>`
  color: ${({ isSource }) => (isSource ? theme.grey700 : theme.black)};
  ${Pretendard.Text};
  font-weight: 500;
  white-space: pre-line;
`;
export const ExampleLayout = styled.div`
  width: 100%;
  ${flex.CENTER}
  align-items: flex-start;
`;
export const ExampleContent = styled.div`
  width: 50%;
  ${flex.COLUMN_VERTICAL}
  gap: 20px;

  &:first-child {
    padding-right: 32px;
  }
  &:nth-child(2) {
    padding-left: 32px;
  }
`;
export const ExampleList = styled.div`
  ${flex.COLUMN_VERTICAL}
  gap: 20px;
`;
export const InputText = styled.pre<{ isScrolling: boolean }>`
  ${RobotoMono.Text}
  width: 100%;
  border: 0.8px solid ${theme.grey400};
  overflow-x: scroll;
  white-space: pre;
  padding: 12px;
  ::-webkit-scrollbar {
    height: ${({ isScrolling }) => (isScrolling ? "12px" : "0px")};
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: ${theme.white};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  ${flex.COLUMN_FLEX}
  gap: 1rem;
  min-width: 300px;
`;

export const ModalMessage = styled.p`
  ${Pretendard.Text}
  text-align: center;
  color: ${theme.black};
`;
