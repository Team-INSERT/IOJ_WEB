import { Button } from "@/shared/components";
import GameRankBlue from "@/assets/GameRankBlue";
import GameRankGrey from "@/assets/GameRankGrey";
import flash from "@/assets/flash.png";
import Character from "@/assets/Character";
import Podium from "@/assets/Podium.svg";
import * as S from "./style";

const rankData = [
  {
    rank: 1,
    name: "강서호랑사또",
    score: "4/6",
    time: "24:24",
    userId: 1,
  },
  {
    rank: 2,
    name: "강서호랑사또",
    score: "4/6",
    time: "24:24",
    userId: 2,
  },
  {
    rank: 3,
    name: "강서호랑사또",
    score: "4/6",
    time: "24:24",
    userId: 3,
  },
  {
    rank: 4,
    name: "강서호랑사또",
    score: "4/6",
    time: "24:24",
    userId: 4,
  },
  {
    rank: 5,
    name: "강서호랑사또",
    score: "4/6",
    time: "24:24",
    userId: 5,
  },
  {
    rank: 6,
    name: "강서호랑사또",
    score: "4/6",
    time: "24:24",
    userId: 6,
  },
  {
    rank: 7,
    name: "강서호랑사또",
    score: "4/6",
    time: "24:24",
    userId: 7,
  },
  {
    rank: 8,
    name: "강서호랑사또",
    score: "4/6",
    time: "24:24",
    userId: 8,
  },
];

export const Result = () => (
  <S.ResultBox>
    <S.BlueBg>
      <GameRankBlue />
    </S.BlueBg>
    <S.GreyBg>
      <GameRankGrey />
    </S.GreyBg>
    <S.RankingBox>
      <S.GameInfo>
        <S.GameTitle>게임제목입니다</S.GameTitle>
        <Button mode="small" color="blue" font="nexon">
          상세 정보 보기
        </Button>
      </S.GameInfo>
      <S.RankTable>
        <S.RankHeader>
          <S.RankHeaderItem>순위</S.RankHeaderItem>
          <S.RankHeaderItem>이름</S.RankHeaderItem>
          <S.RankHeaderItem>맞은 문제 수</S.RankHeaderItem>
          <S.RankHeaderItem>시간</S.RankHeaderItem>
        </S.RankHeader>

        {rankData.map((item) => (
          <S.RankRow key={item.userId}>
            <S.RankRank>{item.rank}</S.RankRank>
            <S.RankName>{item.name}</S.RankName>
            <S.RankScore>{item.score}</S.RankScore>
            <S.RankTime>{item.time}</S.RankTime>
          </S.RankRow>
        ))}
      </S.RankTable>
    </S.RankingBox>
    <S.Podium>
      <S.PodiumImg src={Podium} />
      <S.Button>
        <Button mode="big" color="blue" font="nexon">
          나가기
        </Button>
      </S.Button>
    </S.Podium>
  </S.ResultBox>
);
