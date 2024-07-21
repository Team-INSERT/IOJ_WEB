import React from "react";
import GameRankBlue from "@/assets/GameRankBlue";
import GameRankGrey from "@/assets/GameRankGrey";
import * as S from "./style";

export const GameRanking = () => {
  const title = "2024학년도 1학년 알고리즘 경진대회";
  const questions = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const players = [
    {
      name: "강서호랑사또",
      rank: "1",
      questions: ["1", "wrong", "3", "2", "1", "2", "1", "3"],
    },
    {
      name: "사상호랑사또",
      rank: "2",
      questions: ["1", "1", "3", "wrong", "1", "", "1", "3"],
    },
    {
      name: "양산호랑사또",
      rank: "3",
      questions: ["1", "1", "3", "", "1", "2", "wrong", "3"],
    },
    {
      name: "김해호랑사또",
      rank: "4",
      questions: ["1", "", "3", "wrong", "", "2", "1", "3"],
    },
    {
      name: "대저호랑사또",
      rank: "5",
      questions: ["1", "wrong", "3", "2", "", "", "1", "3"],
    },
    {
      name: "울산호랑사또",
      rank: "6",
      questions: ["1", "wrong", "3", "", "wrong", "2", "", "3"],
    },
    {
      name: "기장호랑사또",
      rank: "7",
      questions: ["1", "wrong", "wrong", "2", "1", "", "1", "3"],
    },
    {
      name: "양정호랑사또",
      rank: "8",
      questions: ["1", "1", "", "2", "wrong", "2", "wrong", "wrong"],
    },
    {
      name: "만덕호랑사또",
      rank: "9",
      questions: ["1", "1", "3", "", "wrong", "wrong", "wrong", "3"],
    },
    {
      name: "대연호랑사또",
      rank: "10",
      questions: ["1", "wrong", "wrong", "2", "1", "", "", "3"],
    },
    {
      name: "광안호랑사또",
      rank: "11",
      questions: ["1", "wrong", "", "2", "1", "wrong", "wrong", "wrong"],
    },
    {
      name: "서면호랑사또",
      rank: "12",
      questions: ["wrong", "wrong", "3", "", "wrong", "wrong", "", "3"],
    },
  ];
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
              {questions.map((item) => (
                <S.QuestionLayout questionSum={questions.length}>
                  <S.QuestionName>{item}</S.QuestionName>
                </S.QuestionLayout>
              ))}
            </S.QuestionsNames>
          </S.Attribute>
          <S.BlueLine />
          <S.RankingLayout>
            {players.map((player) => (
              <S.UserRow key={player.rank}>
                <S.Ranking rank={player.rank}>{player.rank}</S.Ranking>
                <S.Name>{player.name}</S.Name>
                <S.Questions>
                  {player.questions.map((result, index) => {
                    if (result === "") {
                      return <S.NotSolved questionSum={questions.length} />;
                    }
                    if (result === "wrong") {
                      return <S.RedQuestion questionSum={questions.length} />;
                    }
                    return (
                      <S.Question questionSum={questions.length}>
                        <S.QuestionSolveRank>
                          {player.questions[index]}
                        </S.QuestionSolveRank>
                      </S.Question>
                    );
                  })}
                </S.Questions>
              </S.UserRow>
            ))}
          </S.RankingLayout>
        </S.Chart>
      </S.Content>
    </S.Layout>
  );
};

export default GameRanking;