import * as S from "./style";
import QuestionCategory from "../../../assets/QuestinCategory";
import Stars from "../../components/Stars";

interface Details {
  qustionNumebr: string;
  number: number;
  title: string;
  level: number;
}

const Question = ({ qustionNumebr, number, title, level }: Details) => {
  const formattedNumber = number.toString().padStart(4, "0");

  return (
    <S.Layout>
      <QuestionCategory />
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
