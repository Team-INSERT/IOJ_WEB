import { theme } from "../../../style";
import * as S from "./style";

interface Details {
  submitNumber: number;
  userName: string;
  questionNumber: number;
  result: string;
  memory: number;
  time: number;
  useLanguage: string;
  codeLength: number;
  submitTime: number;
}

const Result = ({
  submitNumber,
  userName,
  questionNumber,
  result,
  memory,
  time,
  useLanguage,
  codeLength,
  submitTime,
}: Details) => {
  let color;
  switch (result) {
    case "correct":
      result = "정답입니다!!";
      color = theme.correctGreen;
      break;
    case "incorrect":
      result = "오답입니다";
      color = theme.warningRed;
      break;
    case "compileError":
      result = "컴파일에러";
      color = theme.blueDarkHover;
      break;
    case "runtimeError":
      result = "런타임에러";
      color = "#762EBF";
      break;
    default:
      result = result;
      color = "inherit";
  }

  return (
    <S.Layout>
      <tbody>
        <S.Tr>
          <S.SubmitNumber>{submitNumber}</S.SubmitNumber>
          <S.UserName>{userName}</S.UserName>
          <S.QuestionNumber>{questionNumber}</S.QuestionNumber>
          <S.Result color={color}>{result}</S.Result>
          <S.Memory>
            <div>{memory}</div>
            <S.RedText>KB</S.RedText>
          </S.Memory>
          <S.Time>{time}ms</S.Time>
          <S.UseLanguage>{useLanguage}</S.UseLanguage>
          <S.CodeLength>
            {codeLength}
            <S.RedText>B</S.RedText>
          </S.CodeLength>
          <S.SubmitTime>{submitTime}분 전</S.SubmitTime>
        </S.Tr>
      </tbody>
    </S.Layout>
  );
};

export default Result;
