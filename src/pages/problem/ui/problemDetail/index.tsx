import React, { useEffect, useRef, useState } from "react";
import { Footer, MainHeader } from "@/shared/components";
import { problem } from "@/pages/problem/api/problem";
import * as S from "./style";

interface TestcaseType {
  input: string;
  output: string;
}

interface ProblemType {
  title: string;
  content: string;
  inputContent: string;
  outputContent: string;
  level: number;
  memoryLimit: number;
  timeLimit: number;
  testcases: TestcaseType[];
  source: string;
}

export const ProblemDetail = () => {
  const { pathname } = window.location;
  const segments = pathname.split("/");
  const problemId = segments[segments.length - 1];

  const inputTextRefs = useRef<(HTMLPreElement | null)[]>([]);
  const [problemDetail, setProblemDetail] = useState<ProblemType>();
  const [isScrolling, setIsScrolling] = useState<boolean[]>([]);

  useEffect(() => {
    try {
      (async () => {
        const res = await problem(parseInt(problemId, 10));
        setProblemDetail(res);
      })();
    } catch (err) {
      /**/
    }
  }, [problemId]);

  useEffect(() => {
    inputTextRefs.current.forEach((container, index) => {
      if (container) {
        const handleWheel = (event: WheelEvent) => {
          if (event.deltaY !== 0) {
            if (container.scrollWidth > container.clientWidth) {
              // eslint-disable-next-line no-param-reassign
              container.scrollLeft += event.deltaY;
              setIsScrolling((prev) => {
                const newScrolling = [...prev];
                newScrolling[index] = true;
                return newScrolling;
              });
              event.preventDefault();

              setTimeout(() => {
                setIsScrolling((prev) => {
                  const newScrolling = [...prev];
                  newScrolling[index] = false;
                  return newScrolling;
                });
              }, 1000);
            }
          }
        };

        container.addEventListener("wheel", handleWheel);

        return () => {
          container.removeEventListener("wheel", handleWheel);
        };
      }
      return undefined;
    });
  }, [isScrolling]);

  return (
    <>
      <MainHeader />
      <S.Layout>
        <S.ProblemHeader>
          <S.ProblemNum>{String(problemId).padStart(4,'0')}</S.ProblemNum>
          <S.TitleAndLimit>
            <S.ProblemTitle>{problemDetail?.title}</S.ProblemTitle>
            <S.LimitLayout>
              <S.Detail>
                <S.BlueText>난이도</S.BlueText>: {problemDetail?.level}
              </S.Detail>
              <S.Detail>
                <S.BlueText>시간제한</S.BlueText>: {problemDetail?.timeLimit}{" "}
                Sec
              </S.Detail>
              <S.Detail>
                <S.BlueText>메모리제한</S.BlueText>: {problemDetail?.memoryLimit} MB
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
            <S.ProblemInfo isSource={false}>
              {problemDetail?.content}
            </S.ProblemInfo>
          </S.ProblemLayout>
          <S.ProblemLayout>
            <S.SubTitleLayout>
              <S.Problem>입력</S.Problem>
              <S.GreyLine />
            </S.SubTitleLayout>
            <S.ProblemInfo isSource={false}>
              {problemDetail?.inputContent}
            </S.ProblemInfo>
          </S.ProblemLayout>
          <S.ProblemLayout>
            <S.SubTitleLayout>
              <S.Problem>출력</S.Problem>
              <S.GreyLine />
            </S.SubTitleLayout>
            <S.ProblemInfo isSource={false}>
              {problemDetail?.outputContent}
            </S.ProblemInfo>
          </S.ProblemLayout>
          {problemDetail?.testcases.map((example, index) => (
            <S.ExampleLayout>
              <S.ExampleContent>
                <S.SubTitleLayout>
                  <S.Problem>{`예제 입력${index + 1}`}</S.Problem>
                  <S.GreyLine />
                </S.SubTitleLayout>
                <S.InputText
                  ref={(el) => {
                    inputTextRefs.current[index * 2] = el;
                  }}
                  isScrolling={isScrolling[index * 2] || false}
                >
                  {example.input}
                </S.InputText>
              </S.ExampleContent>
              <S.ExampleContent>
                <S.SubTitleLayout>
                  <S.Problem>{`예제 출력${index + 1}`}</S.Problem>
                  <S.GreyLine />
                </S.SubTitleLayout>
                <S.InputText
                  ref={(el) => {
                    inputTextRefs.current[index * 2 + 1] = el;
                  }}
                  isScrolling={isScrolling[index * 2 + 1] || false}
                >
                  {example.output}
                </S.InputText>
              </S.ExampleContent>
            </S.ExampleLayout>
          ))}
          <S.ProblemLayout>
            <S.SubTitleLayout>
              <S.Problem>출처</S.Problem>
              <S.GreyLine />
            </S.SubTitleLayout>
            <S.ProblemInfo isSource>
              {problemDetail?.source}
            </S.ProblemInfo>
          </S.ProblemLayout>
        </S.ContentLayout>
      </S.Layout>
      <Footer />
    </>
  );
};
