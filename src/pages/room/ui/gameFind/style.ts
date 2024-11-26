import { flex, NexonFont, theme } from "@/shared/style";
import styled from "styled-components";

export const GameFindLayout = styled.div`
  padding: 100px 230px;
  ${flex.COLUMN_FLEX};
  gap: 60px;
`;
export const TitleLayout = styled.div`
  width: 100%;
  ${flex.BETWEEN};
  align-items: end;
`;
export const Title = styled.span`
  ${NexonFont.NexonBigTitle}
`;
export const MainContents = styled.div`
  ${flex.COLUMN_END};
  gap: 12px;
`;
export const FindCreateGame = styled.div`
  ${flex.FLEX}
  margin-left: auto;
  gap: 8px;
`;
export const FindGame = styled.input`
  padding-left: 12px;
  outline: none;
  border: 1px solid ${theme.grey200};
  width: 220px;
  border-radius: 4px;
  background: #fff;
`;
export const GameList = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  justify-self: stretch;
`;
