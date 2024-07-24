import styled from "styled-components";
import { Pretendard, flex, theme } from "@/shared/style";
import code from "@/assets/code.jpg";

export const BackgroundLayout = styled.div`
  background-image: url(${code});
  background-position: center;
  background-size: cover;
  padding-left: 13rem;
  padding-top: 9.75rem;
  padding-bottom: 13.75rem;
`;
export const ContentBox = styled.div`
  ${flex.COLUMN_FLEX}
  gap: 16px;
`;
export const TextBox = styled.div`
  ${flex.COLUMN_FLEX}
  width: 100%;
  gap: 12px;
`;
export const Title = styled.p`
  ${Pretendard.BigText}
  color: ${theme.grey100};
`;
export const SubTitle = styled.p`
  ${Pretendard.BigTitle}
  color: ${theme.white};
`;
export const Info = styled.p`
  ${Pretendard.SmallText}
  color: ${theme.grey200};
`;
export const ExplainLayout = styled.div`
  width: 100%;
  ${flex.COLUMN_CENTER}
  padding-top: 4.5rem;
  padding-bottom: 4.375rem;
`;
export const ExplainContent = styled.div`
  ${flex.COLUMN_CENTER}
  gap: 1.9rem;
`;
export const DevideLine = styled.hr`
  width: 70%;
  background-color: ${theme.grey300};
`;
export const ExplainText = styled.p`
  ${Pretendard.Text}
  color: ${theme.grey600};
`;
export const QuestionLayout = styled.div`
  padding: 3.4375rem 0 3.4375rem 0;
  background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.5) 100%
    ),
    ${theme.grey900};
`;
export const AllSubjects = styled.div`
  ${flex.CENTER}
  gap: 6.25rem;
`;
export const SubjectLayout = styled.div`
  ${flex.COLUMN_HORIZONTAL}
  gap: 24px;
`;
export const SubjectText = styled.p`
  ${Pretendard.BigText}
  color: ${theme.grey200};
`;
export const SubjectCount = styled.p`
  ${Pretendard.BigTitle2}
  color: ${theme.grey100};
  padding-bottom: 3.25rem;
`;
export const RecordLayout = styled.div`
  width: 100%;
  padding: 6rem 0 5.25rem 0;
  ${flex.COLUMN_CENTER}
  gap: 5rem;
`;
export const RecordTextLayout = styled.div`
  ${flex.COLUMN_CENTER}
  gap: 1.25rem;
`;
export const RecordTitle = styled.p`
  ${Pretendard.BigTitle}
  color: ${theme.grey900};
`;
export const RecordSubTitle = styled.p`
  ${Pretendard.BigText}
  color: ${theme.grey600};
`;
export const RecordContent = styled.div`
  ${flex.CENTER}
  gap: 2.75rem;
  position: relative;
`;
export const CardLayout = styled.div`
  ${flex.CENTER}
  gap: 3.25rem;
`;
export const RankLayout = styled.div`
  ${flex.COLUMN_CENTER}
  gap: 2rem;
`;
export const DarkCircle = styled.div`
  width: 15rem;
  height: 15rem;
  background-color: ${theme.grey200};
  border-radius: 50%;
  ${flex.CENTER}
`;
export const BrightCircle = styled.div`
  width: 12.5rem;
  height: 12.5rem;
  background-color: ${theme.white};
  border-radius: 50%;
  ${flex.CENTER}
`;
export const Persent = styled.p`
  ${Pretendard.BigTitle}
  color: ${theme.insertBlue};
`;
export const RankInfoLayout = styled.div`
  ${flex.CENTER}
  gap: 0.75rem;
`;
export const RankInfoTexts = styled.div`
  ${flex.COLUMN_HORIZONTAL}
  gap: 0.75rem;
`;
export const TopPercent = styled.p`
  ${Pretendard.BigText}
`;
export const PersonCount = styled.p`
  ${Pretendard.Text}
  font-weight: bold;
`;
export const BlueText = styled.span`
  color: ${theme.insertBlue};
`;
export const Blind = styled.div`
  position: absolute;
  width: 120%;
  height: 140%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.01);
`;
