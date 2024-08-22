import Clock from "@/assets/Clock";
import Button from "../Button";
import * as S from "./style";

interface gameHeaderProps {
  problemsCount: number;
  problemIndex: number;
}

const GameHeader = ({ problemsCount, problemIndex }: gameHeaderProps) => (
  <S.Layout>
    <S.GameDetails>
      <Button mode="small" color="gray">
        이전
      </Button>
      <S.QuestionNumber>
        {problemIndex}/{problemsCount}
      </S.QuestionNumber>
      <Button mode="small" color="gray">
        다음
      </Button>
    </S.GameDetails>
    <S.ClockContainer>
      <S.Clock>
        <Clock />
        <S.Time>00:00</S.Time>
      </S.Clock>
    </S.ClockContainer>
    <S.Setting>
      <Button mode="small" color="gray">
        제출현황
      </Button>
      <S.LineContainer>
        <S.Line />
      </S.LineContainer>
      <Button mode="small" color="red">
        나가기
      </Button>
    </S.Setting>
  </S.Layout>
);

export default GameHeader;
