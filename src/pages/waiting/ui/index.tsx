import React from "react";
import { UserCompartment, Button } from "@/shared/components";
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
    <S.UserCompartmentContainer>
      {Array.from({ length: 8 }).map(() => (
        <UserCompartment UserName="Dsf" color="red" />
      ))}
    </S.UserCompartmentContainer>
    <S.ButtonBox>
      <Button mode="big" color="glowRed" font="nexon">
        방 삭제하기
      </Button>
      <Button mode="big" color="blue" font="nexon">
        게임시작
      </Button>
    </S.ButtonBox>
  </S.Layout>
);
