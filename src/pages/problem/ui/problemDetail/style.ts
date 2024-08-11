import { Pretendard, flex, theme } from "@/shared/style";
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
export const LimitLayout = styled.div`
  ${flex.FLEX}
  gap: 12px;
`;
export const TimeLimit = styled.p`
  ${Pretendard.SmallText}
  font-weight: 500;
`;
export const MemoryLimit = styled.p`
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
  font-weight: 5;
  border-bottom: 2px solid ${theme.insertBlue};
  z-index: 2;
`;
export const GreyLine = styled.div`
  width: 100%;
  border-bottom: 2px solid ${theme.grey200};
  position: absolute;
  bottom: 0;
  z-index: 1;
`;
export const SubTitleLayout = styled.div`
  width: 100%;
  ${flex.FLEX}
  position: relative;
`
export const problemInfo = styled.p`
  color: ${theme.grey900};
  ${Pretendard.Text}
`