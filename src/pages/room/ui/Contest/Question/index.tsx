import { Button, Question } from "@/shared/components";
import * as S from "./style";

const ContestQuestion = () => {
  return (
    <S.Layout>
      <S.TitleContainer>
        <S.Title>2024학년도 1학년 알고리즘 경진대회</S.Title>
        <S.Button>
          <Button mode="small" color="red">
            뒤로가기
          </Button>
        </S.Button>
      </S.TitleContainer>
      <S.RemainingTimeContainer>
        <S.Time>3시간 25분 17초</S.Time>
        <S.Line />
        <S.ButtonRank>
          <Button mode="small" color="blue">
            순위보러가기
          </Button>
        </S.ButtonRank>
      </S.RemainingTimeContainer>
        <S.QuestionTitle>문제</S.QuestionTitle>
        <S.Question>
          <Question qustionNumebr="A" number={1} title="A + B = ?" level={4} />
          <Question qustionNumebr="B" number={1} title="A + B = ?" level={4} />
          <Question qustionNumebr="C" number={1} title="A + B = ?" level={4} />
          <Question qustionNumebr="D" number={1} title="A + B = ?" level={4} />
        </S.Question>
    </S.Layout>
  );
};

export default ContestQuestion;
