import { theme } from "@/shared/style";
import * as S from "./style";

type questionCategoryProps = {
  mode: string;
};

const QuestionCategory = ({ mode }: questionCategoryProps) => {
  switch (mode) {
    case "solved":
      return (
        <S.Layout color={theme.correctGreen}>
          <S.Text>S</S.Text>
        </S.Layout>
      );
    case "failed":
      return (
        <S.Layout color="#E54747">
          <S.Text>W</S.Text>
        </S.Layout>
      );
    default:
      return <S.Layout color={theme.white} />;
  }
};

export default QuestionCategory;
