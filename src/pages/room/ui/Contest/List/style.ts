import { flex, NexonFont, Pretendard } from "@/shared/style";
import styled from "styled-components";

export const Layout = styled.div`
  padding: 160px 300px 0 300px;
  ${flex.COLUMN_CENTER}
`;
export const TitleContainer = styled.div`
  ${flex.FLEX}
  width: 100%;
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
