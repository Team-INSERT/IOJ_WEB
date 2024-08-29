import React, { useEffect, useState } from "react";
import GameRankBlue from "@/assets/GameRankBlue";
import GameRankGrey from "@/assets/GameRankGrey";
import { gameRakingList } from "@/pages/room/api/roomApi";
import { useParams, useLocation } from "react-router-dom";
import * as S from "./style";

interface ProblemStatuses {
  status: string;
  penalty: number | null;
}

interface Player {
  nickname: string;
  problemStatuses: ProblemStatuses[];
}

export const ContestRanking = () => {
  const [playerDetail, setPlayerDetail] = useState<Player[]>([]);
  const { contestId } = useParams<{ contestId: string }>();
  const location = useLocation();
  const title = location.state?.title || "대회 제목이 제공되지 않았습니다.";

  useEffect(() => {
    const playerList = async () => {
      if (!contestId) {
        console.error("Contest ID가 제공되지 않았습니다.");
        return;
      }
      try {
        const res = await gameRakingList(parseInt(contestId, 10));
        setPlayerDetail(res);
      } catch (err) {
        /**/
      }
    };
    playerList();
  }, [contestId]);
  return (
    <S.Layout>
      <S.BlueBg>
        <GameRankBlue />
      </S.BlueBg>
      <S.GreyBg>
        <GameRankGrey />
      </S.GreyBg>
      <S.Content>
        <S.Title>{title}</S.Title>
        <S.Chart>
          <S.Attribute>
            <S.PropertyText>순위</S.PropertyText>
            <S.PropertyText>이름</S.PropertyText>
            <S.QuestionsNames>
              {playerDetail[0]?.problemStatuses.map((_, index) => (
                <S.QuestionLayout
                  questionSum={playerDetail[0].problemStatuses.length}
                >
                  <S.QuestionName>
                    {String.fromCharCode("A".charCodeAt(0) + index)}
                  </S.QuestionName>
                </S.QuestionLayout>
              ))}
            </S.QuestionsNames>
          </S.Attribute>
          <S.BlueLine />
          <S.RankingLayout>
            {playerDetail.map((player, index) => {
              const rank = (index + 1).toString();
              return (
                <S.UserRow key={rank}>
                  <S.Ranking rank={rank}>{rank}</S.Ranking>
                  <S.Name>{player.nickname}</S.Name>
                  <S.Questions>
                    {player.problemStatuses.map((result) => {
                      if (result.status === "unsolved") {
                        return (
                          <S.NotSolved
                            questionSum={playerDetail[0].problemStatuses.length}
                          />
                        );
                      }
                      if (result.status === "failed") {
                        return (
                          <S.RedQuestion
                            questionSum={playerDetail[0].problemStatuses.length}
                          />
                        );
                      }
                      return (
                        <S.Question
                          questionSum={playerDetail[0].problemStatuses.length}
                        >
                          <S.QuestionSolveRank>
                            {result.penalty}
                          </S.QuestionSolveRank>
                        </S.Question>
                      );
                    })}
                  </S.Questions>
                </S.UserRow>
              );
            })}
          </S.RankingLayout>
        </S.Chart>
      </S.Content>
    </S.Layout>
  );
};
