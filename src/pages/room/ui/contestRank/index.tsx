import React, { useEffect, useState } from "react";
import GameRankBlue from "@/assets/GameRankBlue";
import GameRankGrey from "@/assets/GameRankGrey";
import { gameRakingList } from "@/pages/room/api/roomApi";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/shared/components";
import { Loading } from "@/pages/loading";
import * as S from "./style";
import { Buttons } from "./style";

interface ProblemStatuses {
  status: string;
  penalty: number | null;
}

interface Player {
  nickname: string;
  problemStatuses: ProblemStatuses[];
}

export const ContestRank = () => {
  const navigate = useNavigate();
  const [playerDetail, setPlayerDetail] = useState<Player[]>([]);
  const [rankedPlayers, setRankedPlayers] = useState<Player[][]>([]);
  const { contestId } = useParams<{ contestId: string }>();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const title = params.get("title") || "대회 제목이 제공되지 않았습니다.";

  useEffect(() => {
    const playerList = async () => {
      if (!contestId) {
        console.error("Contest ID가 제공되지 않았습니다.");
        return;
      }
      try {
        const res = await gameRakingList(parseInt(contestId, 10));
        setPlayerDetail(res);

        const numProblems = res[0].problemStatuses.length;
        const rankings: Player[][] = Array.from(
          { length: numProblems },
          () => [],
        );

        for (let i = 0; i < numProblems; i += 1) {
          const solvedPlayers = res.filter(
            (player: { problemStatuses: { status: string }[] }) =>
              player.problemStatuses[i].status === "solved",
          );
          const sortedPlayers = solvedPlayers.sort(
            (
              a: { problemStatuses: { penalty: number }[] },
              b: { problemStatuses: { penalty: number }[] },
            ) => {
              const penaltyA = a.problemStatuses[i].penalty ?? Infinity;
              const penaltyB = b.problemStatuses[i].penalty ?? Infinity;
              return penaltyA - penaltyB;
            },
          );

          rankings[i] = sortedPlayers;
        }
        setRankedPlayers(rankings);
      } catch (err) {
        /**/
      }
    };
    playerList();
  }, [contestId]);
  return rankedPlayers.length ? (
    <S.Layout>
      <S.Content>
        <S.TitleLayout>
          <S.Title>{title}</S.Title>
          <S.Buttons>
            <Button mode="small" color="gray" font="pretendard">
              채점기준
            </Button>
            <Button
              mode="small"
              color="red"
              font="pretendard"
              onClick={() => navigate(-1)}
            >
              나가기
            </Button>
          </S.Buttons>
        </S.TitleLayout>
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
                    {player.problemStatuses.map((result, problemIndex) => {
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
                      const problemRank =
                        rankedPlayers[problemIndex].findIndex(
                          (p) => p.nickname === player.nickname,
                        ) + 1;
                      return (
                        <S.Question
                          questionSum={playerDetail[0].problemStatuses.length}
                        >
                          <S.QuestionSolveRank>
                            {problemRank}
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
  ) : (
    <Loading />
  );
};
