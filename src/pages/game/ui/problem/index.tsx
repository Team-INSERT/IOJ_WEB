import * as S from "./style";
import { Stars } from "shared/components";
export const Problem = () => {
  return (
    <S.ProblemLayout>
      <S.ProblemTitleBox>
        <S.ProblemNo>25534</S.ProblemNo>
        <S.NameBox>
          <S.ProblemName>A+B</S.ProblemName>
          <Stars />
        </S.NameBox>
      </S.ProblemTitleBox>
    </S.ProblemLayout>
  );
};
