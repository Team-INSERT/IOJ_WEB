import styled from "styled-components";
import { Pretendard, theme, flex } from "../../../../shared/style";
import { Button } from "shared/components";

export const ProblemLayout = styled.div`
  ${flex.COLUMN_FLEX};
  background-color: ${theme.white};
  width: 50%;
  height: 100%;
  padding: 76px 45px 0 55px;
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
  ${flex.FLEX}
`;

export const ProblemName = styled.p`
  ${Pretendard.SmallTitle};
  padding-bottom: 2%;
`;
