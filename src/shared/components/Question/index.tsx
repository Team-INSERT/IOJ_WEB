import * as S from "./style";
import Stars from "../../components/Stars";
import QuestionCategory from "../QuestionCategory/QuestionCategory";

interface Details {
  mode: string;
  qustionNumebr: string;
  number: number;
  title: string;
  level: number;
}

const Question = ({ mode, qustionNumebr, number, title, level }: Details) => {
  const formattedNumber = number.toString().padStart(4, "0");

  return (
    <S.Layout>
      <QuestionCategory mode={mode} />
      <S.QustionNumber>{qustionNumebr}</S.QustionNumber>
      <S.Number>{formattedNumber}</S.Number>
      <S.Title>{title}</S.Title>
      <S.Stars>
        <Stars read value={level} />
      </S.Stars>
    </S.Layout>
  );
};

export default Question;

