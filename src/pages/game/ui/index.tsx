import styled from "styled-components";
import { GameHeader } from "@/shared/components";
import { flex } from "@/shared/style";
import { useEffect, useState } from "react";
import { CodeEditor } from "./editor";
import { Problem } from "./problem";
import { gameDetail } from "../api/gameDetail";
import { contestProblems } from "../api/contestDetail";
import { problemDetailType, problemType } from "../interfaces/gameInterfaces";

export const GameLayout = styled.div`
  width: 100%;
  height: 80%;
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
  const [problem, setProblem] = useState<problemDetailType>({
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

  const problemIndex =
    findProblemIndexById(allProblems, parseInt(problemNum, 10));

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

  useEffect(() => {
    const getProblems = async () => {
      try {
        const res = await contestProblems(contestNum);
        setAllProblems(res.problems);
        setProblemsCount(res.problems.length);
      } catch (err) {
        console.log(err);
      }
    };
    getProblems();
  }, []);

  return (
    <GameLayout>
      <GameHeader problemsCount={problemsCount} problemIndex={problemIndex} />
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
