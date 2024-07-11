import React from 'react';
import * as S from './style'
import GameRankBlue from '@/assets/GameRankBlue';
import GameRankGrey from '@/assets/GameRankGrey';

export const GameRanking = () => {
  return (
    <S.Layout>
      <S.BlueBg>
        <GameRankBlue />
      </S.BlueBg>
      <S.GreyBg>
        <GameRankGrey />
      </S.GreyBg>
    </S.Layout>
  );
};