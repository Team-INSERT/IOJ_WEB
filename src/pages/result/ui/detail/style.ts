import styled from "styled-components";
import { theme, flex, NexonFont } from "@/shared/style";

export const ResultBox = styled.div`
  width: 100%;
  height: 100vh;
  ${flex.COLUMN_CENTER}
`;

export const BlueBg = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  ${flex.COLUMN_START};
  z-index: -1;
`;

export const GreyBg = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: -1;
  ${flex.COLUMN_END};
`;

export const GameInfo = styled.div`
  ${flex.BETWEEN};
  width: 1020px;
`;

export const RankingBox = styled.div`
  margin-top: 134px;
  width: 100%;
  height: 100%;
  ${flex.COLUMN_FLEX}
  align-items: center;
`;

const TextStyle = styled.p`
  ${NexonFont.NexonText};
  color: ${theme.grey800};
  text-align: left;
`;

export const GameTitle = styled(TextStyle)`
  ${NexonFont.NexonSmallTitle};
  color: ${theme.black};
`;

export const RankTable = styled.div`
  margin-top: 36px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 30px;
`;

export const RankHeader = styled.div`
  display: contents;
  ${NexonFont.NexonText};
  color: ${theme.grey800};
`;

export const RankHeaderItem = styled(TextStyle)``;
export const RankRow = styled.div`
  display: contents;
  color: ${theme.black};
`;

export const RankRank = styled(TextStyle)``;
export const RankName = styled(TextStyle)``;
export const RankScore = styled(TextStyle)``;
export const RankTime = styled(TextStyle)``;
export const UseItem = styled(TextStyle)``;
export const ShieldItem = styled(TextStyle)``;
