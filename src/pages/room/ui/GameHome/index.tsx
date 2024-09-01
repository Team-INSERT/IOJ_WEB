import { Footer, GameCard, MainHeader } from "@/shared/components";
import { useNavigate } from "react-router-dom";
import * as S from "./style";

export const GameHome = () => {
  const navigate = useNavigate();
  return (
    <>
      <MainHeader />
      <S.Layout>
        <S.Title>게임 시작하기</S.Title>
        <S.SubTitle>원하는 모드와 인원을 선택해 주세요.</S.SubTitle>
        <S.Line />
        <S.ChooseGameMode>
          <GameCard mode="경쟁전" />
          <div onClick={() => navigate("/game/contest")}>
            <GameCard mode="대회" />
          </div>
          <GameCard mode="사용자 지정" />
        </S.ChooseGameMode>
      </S.Layout>
    </>
  );
};
