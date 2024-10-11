import styled from "styled-components";
import { GameHeader } from "@/shared/components";
import { flex } from "@/shared/style";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Split from "react-split";
import { CodeEditor } from "./editor";
import { Problem } from "./problem";
import { gameDetail } from "../api/gameDetail";
import { contestProblems } from "../api/contestDetail";
import { problemInfoProps, problemType } from "../interfaces/gameInterfaces";

export const GameLayout = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  overflow: hidden;
`;

export const GameBox = styled.div`
  ${flex.HORIZONTAL}
  position: fixed;
  width: 100%;
  height: 100%;
`;

export const ProblemWrapper = styled.div`
  height: 100%;
  overflow-y: auto;
`;

export const CodeEditorWrapper = styled.div`
  height: 100%;
  overflow-y: auto;
`;

export const Game = () => {
  const { problemId, contestId } = useParams(); // URL 경로에서 problemId와 contestId 가져오기
  const [problem, setProblem] = useState<problemInfoProps>({
    title: "",
    level: 0,
    content: "",
    inputContent: "",
    outputContent: "",
    memoryLimit: 0,
    testcases: [],
    timeLimit: 0,
  });
  const [problemsCount, setProblemsCount] = useState(0);
  const [allProblems, setAllProblems] = useState<problemType[]>([]);

  // 문제 인덱스 찾기
  const findProblemIndexById = (problems: problemType[], id: number) =>
    problems.findIndex((item) => item.id === id);

  const problemIndex = findProblemIndexById(
    allProblems,
    parseInt(problemId || "0", 10),
  );

  // 문제 데이터를 가져오는 useEffect
  useEffect(() => {
    if (problemId) {
      const fetchProblem = async () => {
        try {
          const res = await gameDetail(parseInt(problemId, 10));
          setProblem(res);
        } catch (err) {
          console.error(err);
        }
      };
      fetchProblem();
    }
  }, [problemId]);

  // 모든 문제 리스트 가져오는 useEffect
  useEffect(() => {
    if (contestId) {
      const fetchContestProblems = async () => {
        try {
          const res = await contestProblems(parseInt(contestId, 10));
          setAllProblems(res.problems);
          setProblemsCount(res.problems.length);
        } catch (err) {
          console.error(err);
        }
      };
      fetchContestProblems();
    }
  }, [contestId]);

  return (
    <GameLayout>
      <GameHeader problemsCount={problemsCount} problemIndex={problemIndex} />
      <Split
        sizes={[50, 50]}
        minSize={200}
        expandToMin={false}
        gutterSize={10}
        gutterAlign="center"
        direction="horizontal"
        cursor="col-resize"
        gutter={(direction) => {
          const gutter = document.createElement("div");
          gutter.className = `gutter gutter-${direction}`;
          gutter.onmouseenter = () => {
            gutter.style.cursor = "col-resize";
          };
          return gutter;
        }}
        style={{ display: "flex", width: "100%", height: "100%" }}
      >
        <ProblemWrapper>
          <Problem
            id={problemId?.padStart(4, "0") || ""}
            title={problem.title}
            timeLimit={problem.timeLimit}
            memoryLimit={problem.memoryLimit}
            content={problem.content}
            inputContent={problem.inputContent}
            outputContent={problem.outputContent}
            level={problem.level}
            testcases={problem.testcases}
          />
        </ProblemWrapper>
        <CodeEditorWrapper>
          <CodeEditor />
        </CodeEditorWrapper>
      </Split>
    </GameLayout>
  );
};
