import React from "react";
import { Button } from "@/shared/components";
import GameRankBlue from "@/assets/GameRankBlue";
import GameRankGrey from "@/assets/GameRankGrey";
import * as S from "./style";

export const Waiting = () => (
  <S.Layout>
    <S.BlueBg>
      <GameRankBlue />
    </S.BlueBg>
    <S.GreyBg>
      <GameRankGrey />
    </S.GreyBg>
    <S.TitleBox>
      <S.Title>제목입니다</S.Title>
      <S.Content>아이템전 / 12명 중 n명 / 5분</S.Content>
    </S.TitleBox>
  </S.Layout>
);
