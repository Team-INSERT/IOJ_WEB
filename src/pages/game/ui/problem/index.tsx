import { Stars } from "@/shared/components";
import { useEffect, useRef, useState } from "react";
import { problemInfoProps } from "@/pages/game/interfaces/gameInterfaces";
import * as S from "./style";

export const Problem = ({
  id,
  title,
  timeLimit,
  memoryLimit,
  content,
  inputContent,
  outputContent,
  level,
  testcases,
  source,
}: problemInfoProps) => {
  const inputTextRefs = useRef<(HTMLPreElement | null)[]>([]);
  const [isScrolling, setIsScrolling] = useState<boolean[]>([]);

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
    <S.ProblemLayout>
      <S.ProblemTitleBox>
        <S.ProblemNo>{id}</S.ProblemNo>
        <S.NameBox>
          <S.ProblemName>{title}</S.ProblemName>
          <S.Star>
            <Stars value={level} />
          </S.Star>
        </S.NameBox>
      </S.ProblemTitleBox>
      <S.MiniBox>
        <S.TimeBox>
          시간 제한 <S.span>: {timeLimit} Sec</S.span>
        </S.TimeBox>
        <S.Memory>
          메모리 제한 <S.span>: {memoryLimit} MB</S.span>
        </S.Memory>
      </S.MiniBox>
      <S.ProblemContentBox>
        <S.Problem>문제</S.Problem>
        <S.ProblemContent>{content}</S.ProblemContent>
        <S.Problem>입력</S.Problem>
        <S.ProblemContent>{inputContent}</S.ProblemContent>
        <S.Problem>출력</S.Problem>
        <S.ProblemContent>{outputContent}</S.ProblemContent>
      </S.ProblemContentBox>
      <S.Case>
        {testcases.map((example, index) => (
          <S.ExampleLayout>
            <S.ExampleContent>
              <S.SubTitleLayout>
                <S.inoutText>{`예제 입력${index + 1}`}</S.inoutText>
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
                <S.inoutText>{`예제 출력${index + 1}`}</S.inoutText>
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
      </S.Case>
      <S.Problem>출처</S.Problem>
      <S.ProblemContent>{source}</S.ProblemContent>
    </S.ProblemLayout>
  );
};
