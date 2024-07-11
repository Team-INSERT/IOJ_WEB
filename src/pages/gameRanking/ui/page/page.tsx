import React from 'react';
import * as S from './style'
import GameRankBlue from '@/assets/GameRankBlue';
import GameRankGrey from '@/assets/GameRankGrey';

export const GameRanking = () => {
  const title = "2024학년도 1학년 알고리즘 경진대회"
  return (
    <S.Layout>
      <S.BlueBg>
        <GameRankBlue />
      </S.BlueBg>
      <S.GreyBg>
        <GameRankGrey />
      </S.GreyBg>
      <S.Content>
        <S.Title>
          {title}
        </S.Title>
      </S.Content>
    </S.Layout>
  );
};