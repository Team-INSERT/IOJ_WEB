import { flex, Pretendard, theme } from "@/shared/style";
import styled from "styled-components";

export const Layout = styled.div`
  padding: 100px 120px 194px 120px;
`;
export const TitleContainer = styled.div`
  ${flex.CENTER}
  padding-bottom: 20px;
  width: 100%;
  position: relative;
`;
export const Title = styled.div`
  ${Pretendard.Title}
  color: ${theme.grey900};
`;
export const Button = styled.div`
  position: absolute;
  right: 0;
`;
export const RemainingTimeContainer = styled.div`
  padding: 56px 370px 103px 370px;
  position: relative;
  border: 1px solid transparent;
  border-radius: 8px;
  background: white;
  background-clip: padding-box;
  box-sizing: border-box;
  ${flex.COLUMN_CENTER}

  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    margin: -3px;
    border-radius: inherit;
    background: linear-gradient(to right bottom, #007cff 0%, #ff48ab 100%);
    box-sizing: border-box;
  }
`;
export const Time = styled.div`
  ${Pretendard.BigTitle2}
  padding-bottom: 28px;
  color: ${theme.grey900};
`;
export const Line = styled.div`
  border-top: 1px solid ${theme.grey300};
  width: 100%;
`;
export const ButtonRank = styled.div`
  padding-top: 31px;
`;
export const QuestionTitle = styled.div`
  padding: 28px 0 20px 0;
  ${Pretendard.SmallTitle}
`;
export const Question = styled.div`
  ${flex.COLUMN_FLEX}
  gap: 8px;
`;
