import { flex, NexonFont, Pretendard } from "@/shared/style";
import styled from "styled-components";

export const Layout = styled.div`
  ${flex.COLUMN_CENTER}
`;
export const ContentLayout = styled.div`
  margin-top: 88px;
`
export const TitleContainer = styled.div`
  ${flex.FLEX}
  width: 1089px;
`;
export const Title = styled.div`
  ${NexonFont.NexonBigTitle}
  margin-right: auto;
  padding: 0 0 28px 15px;
`;
export const Button = styled.div`
  padding: 20px 20px 0 0;
`;
export const ContestList = styled.div`
  ${flex.COLUMN_FLEX}
  gap: 13px;
`;
