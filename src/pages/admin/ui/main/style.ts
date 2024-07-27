import { Pretendard, flex, theme } from "@/shared/style";
import styled from "styled-components";

export const Layout = styled.div`
  padding: 0 5.5rem 0 5.5rem;
  margin-top: 28px;
`;
export const Title = styled.p`
  ${Pretendard.SmallTitle}
`;
export const DevideLine = styled.div`
  height: 2px;
  width: 100%;
  background: linear-gradient(90deg, #007cff 0%, rgba(0, 124, 255, 0.2) 100%);
  margin-top: 12px;
`;
export const FormLayout = styled.div`
  ${flex.COLUMN_HORIZONTAL}
  gap: 12px;
  margin-top: 28px;
`;
export const NameLayout = styled.div`
  ${flex.VERTICAL}
  gap: 40px;
`;
export const Subject = styled.p`
  ${Pretendard.BigText}
  font-weight: 700 !important;
`;
export const Input = styled.input`
  height: 40px;
  width: 380px;
  padding: 0 12px 0 12px;
  border-radius: 4px;
  border: 1px solid ${theme.grey200};
  ${flex.VERTICAL}
  ${Pretendard.Text}

  &::placeholder {
    color: ${theme.grey400};
  }
`;
export const PeriodLayout = styled.div`
  ${flex.VERTICAL}
  gap: 20px;
`;
export const Wave = styled.p`
  ${Pretendard.BigText}
`
export const Period = styled.div`
  ${flex.VERTICAL}
  gap: 16px;
`;
export const QuestionLayout = styled.div`
  ${flex.VERTICAL}
  gap: 61px;
`;
export const DayLayout = styled.div`
  ${flex.FLEX}
  gap: 4px;
`
export const Date = styled.input.attrs({ type: "date" })`
  color: ${theme.grey400};
  border-radius: 4px;
  border: 1px solid ${theme.grey200};
  height: 40px;
  padding: 0 0 0 12px;
  ${Pretendard.Text}

`;
export const Time = styled.input.attrs({ type: "time" })`
  color: ${theme.grey400};
  border-radius: 4px;
  border: 1px solid ${theme.grey200};
  height: 40px;
  padding: 0 12px 0 12px;
  ${Pretendard.Text}
`;
export const ListLayout = styled.div`
  ${flex.BETWEEN}
  align-items: end;
  margin-top: 44px;
`