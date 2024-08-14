import { Button, Footer, MainHeader, Level, Stars } from "@/shared/components";
import React, { useState } from "react";
import * as S from "./style";

export const Question = () => {
  const [contestName, setContestName] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("Lv.1");
  return (
    <>
      <MainHeader />
      <S.createQLayout>
        <S.createSection>
          <S.Title>QUESTION CREATE</S.Title>
          <S.UnderBar />
          <S.Box>
            <S.Text>문제명</S.Text>
            <S.ProblemInput />
          </S.Box>
          <S.Box>
            <S.Text>문제 설명</S.Text>
            <S.ExplainInput />
          </S.Box>
          <S.Box>
            <S.Text>입력 설명</S.Text>
            <S.InputInput />
          </S.Box>
          <S.Box>
            <S.Text>레벨</S.Text>
            <S.LebelBox>
              <Level
                options={["Lv.1", "Lv.2", "Lv.3", "Lv.4", "Lv.5"]}
                selectedOption={selectedLevel}
                onSelect={setSelectedLevel}
              />
            </S.LebelBox>
          </S.Box>
          <S.Box>
            <S.Text>메모리 제한</S.Text>
            <S.MemoryInput />
          </S.Box>
          <S.Box>
            <S.Text>시간 제한</S.Text>
            <S.TimeInput />
          </S.Box>
        </S.createSection>
        <S.previewSection>
          <S.ProblemTitleBox>
            <S.ProblemNo>25534</S.ProblemNo>
            <S.NameBox>
              <S.ProblemName>A+B</S.ProblemName>
              <S.Star>
                <Stars value={3} />
              </S.Star>
            </S.NameBox>
          </S.ProblemTitleBox>
          <S.ProblemContentBox>
            <S.Problem>문제</S.Problem>
            <S.ProblemContent>
              두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을
              작성하시오
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
                <S.ExBox />
                <S.ExBox />
                <S.ExBox />
              </S.BoxLayout>
            </S.TestInputBox>
            <S.TestOutputBox>
              <S.TestInput>예제출력</S.TestInput>
              <S.BoxLayout>
                <S.ExBox />
                <S.ExBox />
                <S.ExBox />
              </S.BoxLayout>
            </S.TestOutputBox>
          </S.TestBox>
        </S.previewSection>
      </S.createQLayout>
      <Footer />
    </>
  );
};
