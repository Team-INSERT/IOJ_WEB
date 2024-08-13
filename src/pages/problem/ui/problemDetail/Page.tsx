import React, { useEffect, useRef, useState } from "react";
import { Footer, MainHeader } from "@/shared/components";
import * as S from "./style";

export const ProblemDetail = () => {
  const inputTextRef = useRef<HTMLPreElement | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const container = inputTextRef.current;

    if (container) {
      const handleWheel = (event: WheelEvent) => {
        if (event.deltaY !== 0) {
          container.scrollLeft += event.deltaY; // 세로 휠 움직임을 가로 스크롤로 변환
          setIsScrolling(true); // 스크롤 상태 활성화
          event.preventDefault(); // 기본 스크롤 동작 방지

          // 일정 시간 후에 스크롤 상태 비활성화
          setTimeout(() => {
            setIsScrolling(false);
          }, 1000);
        }
      };

      container.addEventListener("wheel", handleWheel);

      return () => {
        container.removeEventListener("wheel", handleWheel);
      };
    }
    return undefined;
  }, []);

  return (
    <>
      <MainHeader />
      <S.Layout>
        <S.ProblemHeader>
          <S.ProblemNum>0001</S.ProblemNum>
          <S.TitleAndLimit>
            <S.ProblemTitle>열심히 일하는 개미</S.ProblemTitle>
            <S.LimitLayout>
              <S.Detail>
                <S.BlueText>난이도</S.BlueText> : 1 
              </S.Detail>
              <S.Detail>
                <S.BlueText>시간제한</S.BlueText> : 1 Sec
              </S.Detail>
              <S.Detail>
                <S.BlueText>메모리제한</S.BlueText> : 2012 MB
              </S.Detail>
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
            <S.ProblemInfo>
              두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을
              작성하시오.
            </S.ProblemInfo>
          </S.ProblemLayout>
          <S.ProblemLayout>
            <S.SubTitleLayout>
              <S.Problem>입력</S.Problem>
              <S.GreyLine />
            </S.SubTitleLayout>
            <S.ProblemInfo>
              첫째 줄에 A와 B가 주어진다. (0 {"<"} A, B {"<"} 10)
            </S.ProblemInfo>
          </S.ProblemLayout>
          <S.ExampleList>
            <S.ExampleLayout>
              <S.ExampleContent>
                <S.SubTitleLayout>
                  <S.Problem>예제 입력1</S.Problem>
                  <S.GreyLine />
                </S.SubTitleLayout>
                <S.InputText ref={inputTextRef} isScrolling={isScrolling}>
                  {`3\n12 3\n11 6`}
                </S.InputText>
              </S.ExampleContent>
              <S.ExampleContent>
                <S.SubTitleLayout>
                  <S.Problem>예제 출력1</S.Problem>
                  <S.GreyLine />
                </S.SubTitleLayout>
                <S.InputText ref={inputTextRef} isScrolling={isScrolling}>
                  {`3532525325325451564316341641368431698413768341689043689034764380943690136325\n`}
                </S.InputText>
              </S.ExampleContent>
            </S.ExampleLayout>
            <S.ExampleLayout>
              <S.ExampleContent>
                <S.SubTitleLayout>
                  <S.Problem>예제 입력2</S.Problem>
                  <S.GreyLine />
                </S.SubTitleLayout>
                <S.InputText ref={inputTextRef} isScrolling={isScrolling}>
                  {`3\n12 3\n11 6`}
                </S.InputText>
              </S.ExampleContent>
              <S.ExampleContent>
                <S.SubTitleLayout>
                  <S.Problem>예제 출력2</S.Problem>
                  <S.GreyLine />
                </S.SubTitleLayout>
                <S.InputText ref={inputTextRef} isScrolling={isScrolling}>
                  {`3532525325325451564316341641368431698413768341689043689034764380943690136325\n`}
                </S.InputText>
              </S.ExampleContent>
            </S.ExampleLayout>
            <S.ExampleLayout>
              <S.ExampleContent>
                <S.SubTitleLayout>
                  <S.Problem>예제 입력3</S.Problem>
                  <S.GreyLine />
                </S.SubTitleLayout>
                <S.InputText ref={inputTextRef} isScrolling={isScrolling}>
                  {`3\n12 3\n11 6`}
                </S.InputText>
              </S.ExampleContent>
              <S.ExampleContent>
                <S.SubTitleLayout>
                  <S.Problem>예제 출력3</S.Problem>
                  <S.GreyLine />
                </S.SubTitleLayout>
                <S.InputText ref={inputTextRef} isScrolling={isScrolling}>
                  {`3532525325325451564316341641368431698413768341689043689034764380943690136325\n`}
                </S.InputText>
              </S.ExampleContent>
            </S.ExampleLayout>
          </S.ExampleList>
        </S.ContentLayout>
      </S.Layout>
      <Footer />
    </>
  );
};
