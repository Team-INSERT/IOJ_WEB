import styled from "styled-components";
import { GameHeader } from "@/shared/components";
import { flex } from "@/shared/style";
import { useEffect, useState } from "react";
import { CodeEditor } from "./editor";
import { Problem } from "./problem";
import { gameDetail } from "../api/gameDetail";

export const GameLayout = styled.div`
  width: 100%;
  height: 80%;
`;
export const GameBox = styled.div`
  ${flex.HORIZONTAL}
  width: 100%;
  height: 100%;
`;

interface testcaseType {
  input: string;
  output: string;
}

interface problemValue {
  title: string;
  level: number;
  content: string;
  inputContent: string;
  memoryLimit: number;
  testcases: testcaseType[];
  timeLimit: number;
}

export const Game = () => {
  const { pathname } = window.location;
  const segments = pathname.split("/");
  const problemNum = segments[segments.length - 1];
  const formattedProblemNum = problemNum.padStart(4, "0");
  const [problem, setProblem] = useState<problemValue>({
    title: "",
    level: 0,
    content: "",
    inputContent: "",
    memoryLimit: 0,
    testcases: [],
    timeLimit: 0,
  });
  console.log(problem.testcases)
  useEffect(() => {
    const getProblemInfo = async () => {
      try {
        const res = await gameDetail(parseInt(problemNum, 10));
        setProblem(res);
      } catch (err) {
        console.log(err);
      }
    };
    getProblemInfo();
  }, [problemNum]);

  return (
    <GameLayout>
      <GameHeader />
      <GameBox>
        <Problem
          id={formattedProblemNum}
          title={problem.title}
          timeLimit={problem.timeLimit}
          memory={problem.memoryLimit}
          problemInfo={problem.content}
          inputInfo={problem.inputContent}
          level={problem.level}
          testcases={problem.testcases}
        />
        <CodeEditor />
      </GameBox>
    </GameLayout>
  );
};
