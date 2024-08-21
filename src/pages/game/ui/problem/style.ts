import styled from "styled-components";
import { Pretendard, theme, flex } from "@/shared/style";

export const ProblemLayout = styled.div`
  ${flex.COLUMN_FLEX};
  background-color: ${theme.white};
  width: 50%;
  padding: 76px 45px 0 55px;
  
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
  width: 2.5rem;
  ${Pretendard.Text};
  font-weight: 500;
  border-bottom: 3px solid ${theme.blueNormal};
`;
export const ProblemContent = styled.p`
  ${Pretendard.SmallText};
  color: ${theme.grey900};
  font-weight: 500;
  margin: 2% 0 4% 1%;
`;

export const TestBox = styled.div`
  ${flex.FLEX};
  margin-top: 4%;
`;

export const TestInputBox = styled.div`
  ${flex.COLUMN_FLEX};
`;

export const TestOutputBox = styled.div`
  ${flex.COLUMN_FLEX};
  margin-left: 10%;
`;

export const TestInput = styled.p`
  width: 5rem;
  ${Pretendard.Text};
  font-weight: 500;
  border-bottom: 3px solid ${theme.blueNormal};
`;

export const BoxLayout = styled.div`
  ${flex.COLUMN_FLEX};
  margin-top: 4%;
`;
export const Box = styled.div`
  width: 278px;
  height: 72px;
  border-radius: 4px;
  border: 0.8px solid ${theme.grey600};
  background: ${theme.grey100};
  margin-top: 3%;
`;
