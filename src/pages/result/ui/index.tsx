import { Button } from "@/shared/components";
import GameRankBlue from "@/assets/GameRankBlue";
import GameRankGrey from "@/assets/GameRankGrey";
import Crown from "@/assets/Crown";
import flash from "@/assets/flash.png";
import Character from "@/assets/Character";
import Podium from "@/assets/Podium.svg";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as S from "./style";
import { getItemResult } from "../api/getItemResult";

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

interface RoomResultInfo {
  nickname: string;
  color: string;
  correctProblem: number;
  totalProblem: number;
  finishedTime: Date;
  useItemCnt: number;
  protectCnt: number;
}

export const Result = () => {
  const [itemRoomResult, setItemRoomResult] = useState<RoomResultInfo[]>([]);
  const [color, setColor] = useState("");
  const { roomId } = useParams();
  useEffect(() => {
    (async () => {
      if (roomId) {
        try {
          const res = await getItemResult(roomId);
          setColor(res.color.toLowerCase());
          setItemRoomResult(res);
        } catch (err) {
          console.error(err);
        }
      }
    })();
  }, []);
  return (
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

          {itemRoomResult.map((item, index) => (
            <S.RankRow key={item.nickname}>
              <S.RankRank>{index + 1}</S.RankRank>
              <S.RankName>{item.nickname}</S.RankName>
              <S.RankScore>{item.correctProblem}</S.RankScore>
              <S.RankTime>{item.finishedTime.toLocaleTimeString()}</S.RankTime>
            </S.RankRow>
          ))}
        </S.RankTable>
      </S.RankingBox>
      <S.Podium>
        <S.FirstPlaceCharacter>
          <S.CrownPosition>
            <Crown />
          </S.CrownPosition>
          <S.Flash src={flash} />
          <Character characterColor={color[1]} />
        </S.FirstPlaceCharacter>
        <S.SecondPlaceCharacter>
          <Character characterColor={color[0]} />
        </S.SecondPlaceCharacter>
        <S.ThirdPlaceCharacter>
          <Character characterColor={color[2]} />
        </S.ThirdPlaceCharacter>

        <S.PodiumImg src={Podium} alt="Podium 이미지" />

        <S.Button>
          <Button mode="big" color="blue" font="nexon">
            나가기
          </Button>
        </S.Button>
      </S.Podium>
    </S.ResultBox>
  );
};
