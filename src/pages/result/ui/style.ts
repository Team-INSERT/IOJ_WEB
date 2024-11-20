import styled from "styled-components";
import { theme, flex, NexonFont } from "@/shared/style";

export const ResultBox = styled.div`
  width: 100%;
  ${flex.FLEX};
  height: 100vh;
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

export const RankingBox = styled.div`
  margin: 104px 60px 256px 70px;
  width: 50%;
`;

export const GameInfo = styled.div`
  ${flex.BETWEEN};
`;

const TextStyle = styled.p`
  ${NexonFont.NexonText};
  color: ${theme.grey800};
  text-align: left;
`;

export const GameTitle = styled(TextStyle)`
  ${NexonFont.NexonSmallTitle};
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

export const PodiumImg = styled.img`
  width: auto;
  height: auto;
`;

export const Podium = styled.div`
  ${flex.COLUMN_END};
  margin: 550px 60px 256px 0; // margin-top을 200px로 증가
  position: relative;
  bottom: 0;
`;

export const CharacterPosition = styled.div`
  position: absolute;
  width: 50px;
  height: auto;
`;

export const Flash = styled.img`
  position: absolute;
  width: 12rem;
  height: auto;
  top: -1rem;
  left: 4.8rem;
  z-index: -5;
  transform: translateX(-50%);
`;

export const CrownPosition = styled.div`
  position: absolute;
  z-index: 3;
  width: 30px;
  height: auto;
  top: -30px;
  left: 4.5rem;
  transform: translateX(-50%);
`;

export const FirstPlaceCharacter = styled(CharacterPosition)`
  bottom: 15.5rem;
  left: 40%;
  transform: translateX(-50%);
  z-index: 5;
`;

export const SecondPlaceCharacter = styled(CharacterPosition)`
  bottom: 12.5rem;
  left: 8%;
  transform: translateX(-50%);
`;

export const ThirdPlaceCharacter = styled(CharacterPosition)`
  bottom: 10.5rem;
  right: 26%;
  transform: translateX(50%);
`;

export const Button = styled.div`
  ${flex.END};
  width: 100%;
  padding-top: 10px;
`;

export const WinnerBox = styled.div``;
export const WinnerCrown = styled.div``;

export const NickName = styled.p``;
