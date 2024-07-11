import React from "react";
import * as S from "./style";
import GameRankBlue from "@/assets/GameRankBlue";
import GameRankGrey from "@/assets/GameRankGrey";

export const GameRanking = () => {
  const title = "2024학년도 1학년 알고리즘 경진대회";
  const questions = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const players = [
    { name: "강서호랑사또", rank: "1" },
    { name: "사상호랑사또", rank: "2" },
    { name: "양산호랑사또", rank: "3" },
    { name: "김해호랑사또", rank: "4" },
    { name: "대저호랑사또", rank: "5" },
    { name: "울산호랑사또", rank: "6" },
    { name: "기장호랑사또", rank: "7" },
    { name: "양정호랑사또", rank: "8" },
    { name: "만덕호랑사또", rank: "9" },
    { name: "대연호랑사또", rank: "10" },
    { name: "광안호랑사또", rank: "11" },
    { name: "서면호랑사또", rank: "12" },
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
              {questions.map((item, index) => (
                <S.QuestionLayout childCount={questions.length}>
                  <S.QuestionName>{item}</S.QuestionName>
                </S.QuestionLayout>
              ))}
            </S.QuestionsNames>
          </S.Attribute>
          <S.BlueLine />
          <S.RankingLayout>
            {players.map((item, index) => (
              <S.UserRow key={index}>
                <S.Ranking>{item.rank}</S.Ranking>
                <S.Name>{item.name}</S.Name>
                <S.Questions>
                  {questions.map((item, index) => (
                    <S.Question childCount={questions.length} key={index}>
                      <S.QuestionSolveRank>1</S.QuestionSolveRank>
                    </S.Question>
                  ))}
                </S.Questions>
              </S.UserRow>
            ))}
          </S.RankingLayout>
        </S.Chart>
      </S.Content>
    </S.Layout>
  );
};
