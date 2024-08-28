import { Pretendard, flex, theme } from "@/shared/style";
import styled from "styled-components";

export const Layout = styled.div`
  padding: 0 5.5rem 0 5.5rem;
  margin-top: 28px;
  padding-bottom: 180px;
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
  gap: 16px;
  margin-top: 28px;
`;
export const NameLayout = styled.div`
  ${flex.VERTICAL}
  gap: 20px;
`;
export const InputLayout = styled.div`
  ${flex.VERTICAL}
  gap: 46px;
`;
export const Subject = styled.p`
  ${Pretendard.BigText}
  font-weight: 700 !important;
`;
export const Input = styled.input`
  height: 40px;
  width: 400px;
  padding: 0 12px 0 12px;
  border: none;
  border-bottom: 1px solid ${theme.grey400};

  ${flex.VERTICAL}
  ${Pretendard.Text}
    &::placeholder {
    color: ${theme.grey400};
  }

  &:focus {
    outline: none;
  }
`;
export const PeriodLayout = styled.div`
  ${flex.VERTICAL}
  gap: 26px;
`;
export const Wave = styled.p`
  ${Pretendard.BigText}
`;
export const Period = styled.div`
  ${flex.VERTICAL}
  gap: 16px;
`;
export const QuestionLayout = styled.div`
  ${flex.VERTICAL}
  gap: 67px;
`;
export const DayLayout = styled.div`
  ${flex.FLEX}
  gap: 4px;
`;
export const Date = styled.input.attrs({ type: "date" })`
  color: ${theme.grey900};
  border: none;
  border-bottom: 1px solid ${theme.grey400};
  height: 40px;
  padding: 0 0 0 12px;

  ${Pretendard.Text}
  &:focus {
    outline: none;
  }
`;
export const Time = styled.input.attrs({ type: "time" })`
  color: ${theme.grey900};
  border: none;
  border-bottom: 1px solid ${theme.grey400};
  height: 40px;
  padding: 0 12px 0 12px;

  ${Pretendard.Text}
  &:focus {
    outline: none;
  }
`;
export const AuthorityLayout = styled.div`
  ${flex.VERTICAL}
  gap: 20px;
`;
export const Select = styled.select`
  color: ${theme.grey900};
  border: none;
  border-bottom: 1px solid ${theme.grey400};
  height: 40px;
  padding: 0 8px 0 8px;

  ${Pretendard.Text}
  &:focus {
    outline: none;
  }
`;
export const Option = styled.option``;
export const ListLayout = styled.div`
  ${flex.BETWEEN}
  align-items: end;
  margin-top: 44px;
`;
export const ContestLayout = styled.div`
  margin-top: 28px;
  width: 100%;
  ${flex.FLEX};
  flex-wrap: wrap;
  gap: 14px 0;
`;
export const HalfLayout = styled.div<{ index: number }>`
  width: 50%;
  ${({ index }) =>
    index % 2 === 0 ? "padding-right: 12px;" : "padding-left: 12px;"}
`;
export const ContestBox = styled.div`
  ${flex.COLUMN_VERTICAL};
  align-items: start;
  width: 100%;
  padding: 12px;
  gap: 8px;
  border-radius: 4px;
  background: ${theme.white};
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
`;
export const TextLayout = styled.div`
  ${flex.FLEX};
  gap: 8px;
`;
export const ContestText = styled.p`
  min-width: 75px;
  word-wrap: break-word; /* 너무 긴 단어가 있으면 줄바꿈 */
  word-break: break-word;
`;
export const TextDeviceLine = styled.div`
  width: 1.5px;
  background-color: ${theme.grey400};
`;
