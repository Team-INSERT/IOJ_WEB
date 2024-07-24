import styled from "styled-components";
import { NexonFont, Pretendard, flex, theme } from "@/shared/style";

export const Layout = styled.div`
  padding: 14px 0;
  width: 100%;
  background-color: #333333;
  ${flex.VERTICAL}
`;

export const GameDetails = styled.div`
  ${flex.FLEX}
  padding-left: 40px;
  ${NexonFont.NexonSmallText};
`;

export const QuestionNumber = styled.div`
  padding: 0 27px;
  ${flex.VERTICAL}
  color: ${theme.white};
`;

export const ClockContainer = styled.div`
  width: 70%;
  ${flex.CENTER}
`;

export const Clock = styled.div`
  ${flex.FLEX}
  padding: 6px 28px;
  border: 2px solid ${theme.grey300};
  gap: 12px;
  border-radius: 8px;
`;

export const Time = styled.div`
  color: ${theme.grey300};
  ${Pretendard.Text}
`;

export const Setting = styled.div`
  ${flex.FLEX}
  margin-left: auto;
  padding-right: 20px;
`;

export const LineContainer = styled.div`
  padding: 6px 20px;
`;

export const Line = styled.div`
  border-left: 1px solid ${theme.grey600};
  height: 100%;
`;
