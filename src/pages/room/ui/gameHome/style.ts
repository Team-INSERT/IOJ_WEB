import { flex, NexonFont, theme } from "@/shared/style";
import styled from "styled-components";

export const Layout = styled.div`
  ${flex.COLUMN_VERTICAL}
  padding: 4rem 0 4rem 0;
`;
export const Title = styled.div`
  ${NexonFont.NexonBigTitle}
  color: ${theme.grey900};
`;
export const SubTitle = styled.div`
  padding: 20px 0 36px 0;
  ${NexonFont.NexonBigText}
  color: ${theme.grey600};
`;
export const Line = styled.div`
  width: 27%;
  border-top: 1px solid ${theme.grey300};
`;
export const ChooseGameMode = styled.div`
  ${flex.CENTER}
  padding-top: 52px;
  gap: 30px;
`;
