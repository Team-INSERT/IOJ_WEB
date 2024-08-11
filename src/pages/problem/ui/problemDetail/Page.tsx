import React from "react";
import { Footer, MainHeader } from "@/shared/components";
import * as S from "./style";

export const ProblemDetail = () => (
  <>
    <MainHeader />
    <S.Layout>
      <S.ProblemHeader>
        <S.ProblemNum>0001</S.ProblemNum>
        <S.TitleAndLimit>
          <S.ProblemTitle>열심히 일하는 개미</S.ProblemTitle>
          <S.LimitLayout>
            <S.TimeLimit>
              <S.BlueText>시간제한</S.BlueText> : 1 Sec
            </S.TimeLimit>
            <S.MemoryLimit>
              <S.BlueText>메모리제한</S.BlueText> : 2012 MB
            </S.MemoryLimit>
          </S.LimitLayout>
        </S.TitleAndLimit>
      </S.ProblemHeader>
      <S.HeaderLine />
      <S.ContentLayout>
        <S.ProblemLayout>
          <S.SubTitleLayout>
            <S.Problem>문제</S.Problem>
            <S.GreyLine />
          </S.SubTitleLayout>
          <S.problemInfo>
            두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을 작성하시오.
          </S.problemInfo>
        </S.ProblemLayout>
        <S.ProblemLayout>
          <S.SubTitleLayout>
            <S.Problem>입력</S.Problem>
            <S.GreyLine />
          </S.SubTitleLayout>
          <S.problemInfo>
            첫째 줄에 A와 B가 주어진다. (0 {"<"} A, B {"<"} 10)
          </S.problemInfo>
        </S.ProblemLayout>
      </S.ContentLayout>
    </S.Layout>
  </>
);
