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
  width: 399px;
`;
export const TextBox = styled.div`
  ${flex.COLUMN_FLEX}
  width: 100%;
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
