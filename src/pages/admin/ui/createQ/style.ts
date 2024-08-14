import { Pretendard, flex, theme } from "@/shared/style";
import styled from "styled-components";

export const createQLayout = styled.div`
  height: 100vh;
  ${flex.BETWEEN}
`;

export const createSection = styled.div`
  height: 100vh;
  width: 50%;
  padding: 52px 50px;
  ${flex.COLUMN_FLEX};
  background-color: #f6f6f6;
  overflow: auto;
`;

export const Title = styled.p`
  ${Pretendard.SmallTitle};
`;

export const UnderBar = styled.div`
  margin: 12px 0 20px 0;
  height: 2px;
  width: 40rem;
  background: linear-gradient(90deg, #007cff 0%, rgba(0, 124, 255, 0.2) 100%);
`;

export const Box = styled.div`
  ${flex.COLUMN_FLEX};
  margin-bottom: 12px;
`;

export const Text = styled.p`
  ${Pretendard.SmallText};
  font-weight: 700;
  margin-bottom: 2px;
`;

export const ProblemInput = styled.input`
  ${Pretendard.SmallText}
  padding: 12px;
  ${flex.FLEX}
  width:40rem;
  height: 2.5rem;
  border-radius: 4px;
  border: 1px solid ${theme.grey200};
  background: ${theme.white};
`;

export const ExplainInput = styled.textarea`
  ${Pretendard.SmallText}
  padding:12px;
  ${flex.FLEX}
  width:40rem;
  height: 10rem;
  border-radius: 4px;
  border: 1px solid ${theme.grey200};
  background: ${theme.white};
`;

export const InputInput = styled.textarea`
  ${Pretendard.SmallText}
  padding:12px;
  ${flex.FLEX}
  width:40rem;
  height: 10rem;
  border-radius: 4px;
  border: 1px solid ${theme.grey200};
  background: ${theme.white};
`;

export const LebelBox = styled.div`
  ${flex.FLEX}
`;

export const MemoryInput = styled.input`
  ${Pretendard.SmallText}
  padding: 12px;
  ${flex.FLEX}
  width:40rem;
  height: 2.5rem;
  border-radius: 4px;
  border: 1px solid ${theme.grey200};
  background: ${theme.white};
`;
export const TimeInput = styled.input`
  ${Pretendard.SmallText}
  padding: 12px;
  ${flex.FLEX}
  width:40rem;
  height: 2.5rem;
  border-radius: 4px;
  border: 1px solid ${theme.grey200};
  background: ${theme.white};
`;
export const previewSection = styled.div`
  height: 100vh;
  width: 50%;
  padding: 52px 50px;
  ${flex.COLUMN_FLEX};
  overflow: auto;
`;

export const ProblemTitleBox = styled.div`
  ${flex.COLUMN_FLEX};
  border-bottom: 1px solid #d9d9d9;
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
export const ExBox = styled.div`
  width: 278px;
  height: 72px;
  border-radius: 4px;
  border: 0.8px solid ${theme.grey600};
  background: ${theme.grey100};
  margin-top: 3%;
`;
