import React, { useEffect, useState } from "react";
import GameRankBlue from "@/assets/GameRankBlue";
import GameRankGrey from "@/assets/GameRankGrey";
import { gameRakingList } from "@/pages/room/api/roomApi";
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
  const title = "2024학년도 1학년 알고리즘 경진대회";
  const questions = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  useEffect(() => {
    const playerList = async () => {
      try {
        const res = await gameRakingList();
        setPlayerDetail(res);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    playerList();
  }, []);
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
                  <S.QuestionName>{questions[index]}</S.QuestionName>
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
                        return <S.NotSolved questionSum={questions.length} />;
                      }
                      if (result.status === "failed") {
                        return <S.RedQuestion questionSum={questions.length} />;
                      }
                      return (
                        <S.Question questionSum={questions.length}>
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
