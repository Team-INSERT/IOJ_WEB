import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import GameRankBlue from "@/assets/GameRankBlue";
import GameRankGrey from "@/assets/GameRankGrey";
import { Button } from "@/shared/components";
import * as S from "./style";
import { getItemResult } from "../../api/getItemResult";

interface RoomResultInfo {
  nickname: string;
  color: string;
  correctProblem: number;
  totalProblem: number;
  finishedTime: string | null;
  useItemCnt: number;
  protectCnt: number;
}

export const Detail = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const location = useLocation();
  const [itemRoomResult, setItemRoomResult] = useState<RoomResultInfo[]>([]);
  const title = location.state?.title || "게임 제목 없음";

  useEffect(() => {
    const fetchData = async () => {
      if (roomId) {
        try {
          const res = await getItemResult(roomId);
          console.log("API 응답:", res);
          setItemRoomResult(res);
        } catch (err) {
          console.error("API 오류:", err);
        }
      }
    };

    fetchData();
  }, [roomId]);

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
          <S.GameTitle>{title}</S.GameTitle>
          <Button
            mode="small"
            color="blue"
            font="nexon"
            onClick={() => navigate(`/game/result/${roomId}`)}
          >
            돌아가기
          </Button>
        </S.GameInfo>
        <S.RankTable>
          <S.RankHeader>
            <S.RankHeaderItem>순위</S.RankHeaderItem>
            <S.RankHeaderItem>이름</S.RankHeaderItem>
            <S.RankHeaderItem>맞은 문제 수</S.RankHeaderItem>
            <S.RankHeaderItem>시간</S.RankHeaderItem>
            <S.RankHeaderItem>사용한 아이템 수</S.RankHeaderItem>
            <S.RankHeaderItem>방어한 횟수</S.RankHeaderItem>
          </S.RankHeader>

          {itemRoomResult.map((item, index) => (
            <S.RankRow key={item.nickname}>
              <S.RankRank>{index + 1}</S.RankRank>
              <S.RankName>{item.nickname}</S.RankName>
              <S.RankScore>{item.correctProblem}</S.RankScore>
              <S.RankTime>
                {item.finishedTime
                  ? new Date(item.finishedTime).toLocaleTimeString()
                  : "-"}
              </S.RankTime>
              <S.UseItem>{item.useItemCnt}개</S.UseItem>
              <S.ShieldItem>{item.protectCnt}개</S.ShieldItem>
            </S.RankRow>
          ))}
        </S.RankTable>
      </S.RankingBox>
    </S.ResultBox>
  );
};
