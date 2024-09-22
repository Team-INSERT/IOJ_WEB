import { flex, NexonFont, theme } from "@/shared/style";
import styled from "styled-components";

export const GameFindLayout = styled.div`
  padding: 160px 230px;
  ${flex.COLUMN_FLEX}
`;
export const Title = styled.span`
  ${NexonFont.NexonBigTitle}
`;
export const FindCreateGame = styled.div`
  ${flex.FLEX}
  padding-top: 18px;
  margin-left: auto;
  gap: 8px;
`;
export const FindGame = styled.input`
  padding-left: 9px;
  border-radius: 4px;
  outline: none;
  border: 1px solid ${theme.grey200};
`;
export const GameList = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  padding-top: 20px;
  justify-self: stretch;
`;
