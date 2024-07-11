import React from "react";
import * as S from "./style";
import GameRankBlue from "@/assets/GameRankBlue";
import GameRankGrey from "@/assets/GameRankGrey";

export const GameRanking = () => {
  const title = "2024학년도 1학년 알고리즘 경진대회";
  const questions = ['A','B','C','D','E','F','G','H']
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
          <S.PropertyText>순위</S.PropertyText>
          <S.PropertyText>이름</S.PropertyText>
          <S.Questions>
            {
              questions.map((item,index) => (
                <S.QuestionLayout childCount={questions.length}>
                  <S.QuestionName>{item}</S.QuestionName>
                </S.QuestionLayout>
              ))
            }
          </S.Questions>
        </S.Chart>
      </S.Content>
    </S.Layout>
  );
};
