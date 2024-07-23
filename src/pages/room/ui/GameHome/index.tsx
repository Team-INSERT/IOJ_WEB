import { GameCard } from "@/shared/components";
import * as S from "./style";

const GameHome = () => (
  <S.Layout>
    <S.Title>게임 시작하기</S.Title>
    <S.SubTitle>원하는 모드와 인원을 선택해 주세요.</S.SubTitle>
    <S.Line />
    <S.ChooseGameMode>
      <GameCard mode="베이직 모드" />
      <GameCard mode="대회 모드" />
      <GameCard mode="커스텀 모드" />
    </S.ChooseGameMode>
  </S.Layout>
);

export default GameHome;
