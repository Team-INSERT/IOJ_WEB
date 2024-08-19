import { Pretendard, flex, theme, RobotoMono } from "@/shared/style";
import styled from "styled-components";

export const createQLayout = styled.div`
  display: flex;
  height: 100vh;
  ${flex.BETWEEN}
`;

export const createSection = styled.div`
  width: 50%;
  padding: 52px 50px;
  ${flex.COLUMN_FLEX};
  background-color: #f6f6f6;
  overflow-y: auto;
  height: calc(100vh - 10px);
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
  width: 40rem;
  height: 2.5rem;
  border-radius: 4px;
  border: 1px solid ${theme.grey200};
  background: ${theme.white};
`;

export const ExplainInput = styled.textarea`
  ${Pretendard.SmallText}
  padding: 12px;
  ${flex.FLEX}
  width: 40rem;
  height: 10rem;
  border-radius: 4px;
  border: 1px solid ${theme.grey200};
  background: ${theme.white};
`;

export const InputInput = styled.textarea`
  ${Pretendard.SmallText}
  padding: 12px;
  ${flex.FLEX}
  width: 40rem;
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
  width: 40rem;
  height: 2.5rem;
  border-radius: 4px;
  border: 1px solid ${theme.grey200};
  background: ${theme.white};
`;

export const TimeInput = styled.input`
  ${Pretendard.SmallText}
  padding: 12px;
  ${flex.FLEX}
  width: 40rem;
  height: 2.5rem;
  border-radius: 4px;
  border: 1px solid ${theme.grey200};
  background: ${theme.white};
`;

export const InputBox = styled.textarea`
  ${Pretendard.SmallText}
  padding: 12px;
  margin-right: 10px;
  width: 18rem;
  height: 5.25rem;
  border-radius: 4px;
  border: 0.8px solid ${theme.grey600};
  background: white;
`;

export const ButtonContainer = styled.div`
  ${flex.COLUMN_FLEX}
  margin-top: 10px;
`;

export const ControlButton = styled.button`
  padding: 1px 0px;
  margin-top: 1px;
  width: 36rem;
  height: 1rem;
  border-radius: 5px;
  border: 1px solid ${theme.grey200};
  background-color: ${theme.grey200};
  cursor: pointer;
`;

export const CheckButton = styled.button<{ selected: boolean }>`
  border-radius: 4px;
  padding: 0px 14px;
  width: 3.25rem;
  height: 5.25rem;
  background-color: ${({ selected }) =>
    selected ? theme.insertBlue : "#86c0ff"};
  border-style: none;
`;

export const BoxFooter = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 50%;
  height: 54px;
  padding: 11px 16px 11px 8px;
  background-color: white;
  border-top: 1px solid ${theme.grey200};
  ${flex.BETWEEN};
  box-shadow: 0px -2px 8px 0px rgba(170, 170, 170, 0.25);
`;

export const Out = styled.p`
  ${Pretendard.SmallText}
  color: ${theme.grey900};

  &:hover {
    cursor: pointer;
    color: ${theme.grey100};
  }
`;

export const previewSection = styled.div`
  overflow-y: auto;
  height: calc(100vh - 10px);
  width: 50%;
  padding: 52px 50px;
  ${flex.COLUMN_FLEX};
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
  min-height: 3.5rem;
`;

export const ProblemContentBox = styled.div`
  ${flex.COLUMN_FLEX};
  padding-top: 8%;
  min-height: auto;
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
  min-height: 2rem;
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
  width: 32%;
  ${Pretendard.Text};
  font-weight: 500;
  border-bottom: 3px solid ${theme.blueNormal};
`;

export const BoxLayout = styled.div`
  ${flex.COLUMN_FLEX};
  margin-top: 4%;
`;

export const ExBox = styled.div`
  ${RobotoMono.SmallText}
  width: 278px;
  height: 72px;
  border-radius: 4px;
  border: 0.8px solid ${theme.grey600};
  background: white;
  margin: 3% 12% 0 0;
  padding: 12px;
  overflow-y: auto;
`;
