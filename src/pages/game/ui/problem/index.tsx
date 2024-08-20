import { Stars } from "@/shared/components";
import * as S from "./style";

export const Problem = () => (
  <S.ProblemLayout>
    <S.ProblemTitleBox>
      <S.ProblemNo>25534</S.ProblemNo>
      <S.NameBox>
        <S.ProblemName>A+B</S.ProblemName>
        <S.Star>
          <Stars value={3} />
        </S.Star>
      </S.NameBox>
    </S.ProblemTitleBox>
    <S.MiniBox>
      <S.TimeBox>
        시간 제한 <S.span>: 1 Sec</S.span>
      </S.TimeBox>
      <S.Memory>
        메모리 제한 <S.span>: 2014 MB</S.span>
      </S.Memory>
    </S.MiniBox>
    <S.ProblemContentBox>
      <S.Problem>문제</S.Problem>
      <S.ProblemContent>
        두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을 작성하시오
      </S.ProblemContent>
      <S.Problem>입력</S.Problem>
      <S.ProblemContent>
        첫째 줄에 A와 B가 주어진다. (0 {"<"} A, B {"<"} 10)
      </S.ProblemContent>
    </S.ProblemContentBox>
    <S.TestBox>
      <S.TestInputBox>
        <S.TestInput>예제입력</S.TestInput>
        <S.BoxLayout>
          <S.Box />
          <S.Box />
          <S.Box />
        </S.BoxLayout>
      </S.TestInputBox>
      <S.TestOutputBox>
        <S.TestInput>예제출력</S.TestInput>
        <S.BoxLayout>
          <S.Box />
          <S.Box />
          <S.Box />
        </S.BoxLayout>
      </S.TestOutputBox>
    </S.TestBox>
  </S.ProblemLayout>
);
