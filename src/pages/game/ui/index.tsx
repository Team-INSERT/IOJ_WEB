import styled from "styled-components";
import { GameHeader } from "@/shared/components";
import { flex } from "@/shared/style";
import { useEffect, useState } from "react";
import { CodeEditor } from "./editor";
import { Problem } from "./problem";
import { gameDetail } from "../api/gameDetail";
import { contestProblems } from "../api/contestDetail";
import { problemInfoProps, problemType } from "../interfaces/gameInterfaces";

export const GameLayout = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;
export const GameBox = styled.div`
  ${flex.HORIZONTAL}
  width: 100%;
  height: 100%;
`;

export const Game = () => {
  const { pathname } = window.location;
  const segments = pathname.split("/");
  const problemNum = segments[segments.length - 1];
  const contestNum = parseInt(segments[segments.length - 3], 10);
  const formattedProblemNum = problemNum.padStart(4, "0");
  const [problem, setProblem] = useState<problemInfoProps>({
    title: "",
    level: 0,
    content: "",
    inputContent: "",
    memoryLimit: 0,
    testcases: [],
    timeLimit: 0,
  });
  const [problemsCount, setProblemsCount] = useState(0);
  const [allProblems, setAllProblems] = useState<problemType[]>([]);

  const findProblemIndexById = (problems: problemType[], id: number) =>
    problems.findIndex((item) => item.id === id);

  const problemIndex = findProblemIndexById(
    allProblems,
    parseInt(problemNum, 10),
  );

  useEffect(() => {
    (async () => {
      try {
        const res = await gameDetail(parseInt(problemNum, 10));
        setProblem(res);
      } catch (err) {
        /**/
      }
    })();
  }, [problemNum]);

  useEffect(() => {
    (async () => {
      try {
        const res = await contestProblems(contestNum);
        setAllProblems(res.problems);
        setProblemsCount(res.problems.length);
      } catch (err) {
        /**/
      }
    })();
  }, [contestNum]);

  return (
    <GameLayout>
      <GameHeader problemsCount={problemsCount} problemIndex={problemIndex} />
      <GameBox>
        <Problem
          id={formattedProblemNum}
          title={problem.title}
          timeLimit={problem.timeLimit}
          memoryLimit={problem.memoryLimit}
          content={problem.content}
          inputContent={problem.inputContent}
          level={problem.level}
          testcases={problem.testcases}
        />
        <CodeEditor />
      </GameBox>
    </GameLayout>
  );
};
