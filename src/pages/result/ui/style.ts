import styled from "styled-components";
import flash from "@/assets/flash.png";
import { Pretendard, theme, flex, NexonFont } from "@/shared/style";

export const ResultBox = styled.div`
  width: 100%;
  ${flex.FLEX};
  overflow: hidden;
`;

export const BlueBg = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  overflow: hidden;
`;

export const GreyBg = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 607px;
  overflow: hidden;
`;

export const RankingBox = styled.div`
  margin: 104px 60px 256px 70px;
  width: 50%;
`;

export const GameInfo = styled.div`
  ${flex.BETWEEN};
`;

export const GameTitle = styled.p`
  ${NexonFont.NexonSmallTitle}
`;

export const RankTable = styled.div`
  margin-top: 36px;
  padding-left: 51px;
  display: grid;
  grid-template-columns: 1fr 2.5fr 1fr 1fr;
  gap: 20px;
`;

export const RankHeader = styled.div`
  display: contents;
  ${NexonFont.NexonText}
  color: ${theme.grey800};
`;

export const RankHeaderItem = styled.div`
  text-align: left;
`;

export const RankRow = styled.div`
  display: contents;
`;

export const RankRank = styled.div`
  ${NexonFont.NexonText}
  color: ${theme.grey800};
  text-align: left;
`;

export const RankName = styled.div`
  ${NexonFont.NexonText}
  color: ${theme.grey800};
  text-align: left;
`;

export const RankScore = styled.div`
  ${NexonFont.NexonText}
  color: ${theme.grey800};
  text-align: left;
`;

export const RankTime = styled.div`
  ${NexonFont.NexonText}
  color: ${theme.grey800};
  text-align: left;
`;

export const Podium = styled.div`
  ${flex.COLUMN_END}
  margin: 104px 60px 256px 0;
`;

export const PodiumImg = styled.img`
  width: auto;
  height: auto;
`;

export const Button = styled.div`
  ${flex.END}
  width: 100%;
  padding-top: 10px;
`;
