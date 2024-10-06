import styled from "styled-components";
import { Pretendard, theme, flex, RobotoMono } from "@/shared/style";

export const ProblemLayout = styled.div`
  ${flex.COLUMN_FLEX};
  background-color: ${theme.white};
  width: 100%;
  height: 100%;
  padding: 76px 45px 50px 55px;
  overflow: auto;
`;

export const ProblemTitleBox = styled.div`
  ${flex.COLUMN_FLEX};
  border-bottom: 1px solid #d9d9d9;
`;

export const MiniBox = styled.div`
  ${flex.FLEX}
  ${Pretendard.SmallText}
  font-weight: 400;
  margin-top: 2%;
  color: ${theme.insertBlue};
`;

export const TimeBox = styled.div`
  margin-right: 2%;
`;
export const Memory = styled.div``;

export const span = styled.span`
  color: ${theme.black};
`;
export const ProblemNo = styled.p`
  ${Pretendard.Text};
  font-weight: 400;
  color: ${theme.grey600};
`;

export const NameBox = styled.div`
  ${flex.BETWEEN}
`;

export const Star = styled.div`
  ${flex.FLEX}
`;
export const ProblemName = styled.p`
  ${Pretendard.SmallTitle};
  padding-bottom: 2%;
`;

export const ProblemContentBox = styled.div`
  ${flex.COLUMN_FLEX};
  padding-top: 8%;
`;

export const Problem = styled.p`
  width: 3rem;
  ${Pretendard.BigText};
  font-weight: 500;
  border-bottom: 3px solid ${theme.blueNormal};
`;

export const ProblemContent = styled.p`
  ${Pretendard.Text};
  color: ${theme.grey900};
  margin: 2% 0 8% 0;
  white-space: pre-line;
`;

export const TestBox = styled.div`
  ${flex.FLEX};
  margin-top: 4%;
`;

export const TestInputBox = styled.div`
  ${flex.COLUMN_FLEX};
  gap: 20px;
`;

export const TestOutputBox = styled.div`
  ${flex.COLUMN_FLEX};
  margin-left: 10%;
  gap: 20px;
`;

export const TestInput = styled.p`
  width: 6.5rem;
  ${Pretendard.BigText};
  font-weight: 500;
  border-bottom: 3px solid ${theme.blueNormal};
`;
export const Case = styled.div`
  ${flex.COLUMN_VERTICAL}
  gap: 20px;
  padding-bottom: 40px;
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
export const SubTitleLayout = styled.div`
  width: 100%;
  ${flex.FLEX}
  position: relative;
`;
export const GreyLine = styled.div`
  width: 100%;
  border-bottom: 2px solid ${theme.grey200};
  position: absolute;
  bottom: 0;
`;
export const inoutText = styled.p`
  ${Pretendard.BigText}
  font-weight: 5;
  border-bottom: 2px solid ${theme.insertBlue};
  z-index: 1;
`;
