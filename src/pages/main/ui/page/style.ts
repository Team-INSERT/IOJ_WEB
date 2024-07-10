import { Pretendard, flex, theme } from "../../../../shared/style";
import styled from "styled-components";
import code from "../../../../assets/code.jpg";

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
  margin: 0;
`;
export const SubTitle = styled.p`
  ${Pretendard.BigTitle}
  color: ${theme.white};
  margin: 0;
`;
export const Info = styled.p`
  ${Pretendard.SmallText}
  color: ${theme.grey200};
  margin: 0;
`;
export const ExplainLayout = styled.div`
  width: 100%;
  ${flex.COLUMN_CENTER}
  padding-top: 4.75rem;
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
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.50) 100%), ${theme.grey900};
`;
export const AllSubjects = styled.div`
  ${flex.CENTER}
  gap: 6.25rem;
`
export const SubjectLayout = styled.div`
  ${flex.COLUMN_HORIZONTAL}
  gap: 24px;  
`
export const SubjectText = styled.p`
  ${Pretendard.BigText}
  color: ${theme.grey200};
  margin: 0;
`
export const SubjectCount = styled.p`
  ${Pretendard.BigTitle2}
  color: ${theme.grey100};
  margin: 0;
  padding-bottom: 3.25rem;
`
export const RecordLayout = styled.div`
  width: 100%;
  padding: 6rem 0 5.25rem 0;
  ${flex.COLUMN_CENTER}
`
export const RecordTitle = styled.p`
  margin: 0;
  ${Pretendard.BigTitle}
  color: ${theme.grey900};
`
export const RecordSubTitle = styled.p`
  margin: 1.25rem 0 0 0;
  ${Pretendard.BigText}
  color: ${theme.grey600};
`
