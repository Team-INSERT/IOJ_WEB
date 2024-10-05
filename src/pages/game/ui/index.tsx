import styled from "styled-components";
import { GameHeader } from "@/shared/components";
import { flex } from "@/shared/style";
import { useEffect, useState, useRef } from "react";
import { CodeEditor } from "./editor";
import { Problem } from "./problem";
import { gameDetail } from "../api/gameDetail";
import { contestProblems } from "../api/contestDetail";
import { problemInfoProps, problemType } from "../interfaces/gameInterfaces";

export const GameLayout = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  display: flex;
  flex-direction: column;
`;

export const GameBox = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - 50px);
`;

export const ProblemWrapper = styled.div`
  height: 100%;
  overflow-y: auto;
  flex-grow: 1;
`;

export const CodeEditorWrapper = styled.div`
  height: 100%;
  overflow-y: auto;
  flex-grow: 1;
`;

export const Resizer = styled.div`
  width: 5px;
  background-color: #ccc;
  cursor: col-resize;
  position: relative;
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
    outputContent: "",
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

  const problemRef = useRef<HTMLDivElement>(null);
  const codeEditorRef = useRef<HTMLDivElement>(null);
  const resizerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (resizerRef.current && problemRef.current && codeEditorRef.current) {
        const newWidth =
          e.clientX - problemRef.current.getBoundingClientRect().left;
        problemRef.current.style.width = `${newWidth}px`;
        codeEditorRef.current.style.width = `calc(100% - ${newWidth}px)`;
      }
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    const handleMouseDown = () => {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    };

    if (resizerRef.current) {
      resizerRef.current.addEventListener("mousedown", handleMouseDown);
    }

    return () => {
      if (resizerRef.current) {
        resizerRef.current.removeEventListener("mousedown", handleMouseDown);
      }
    };
  }, []);

  return (
    <GameLayout>
      <GameHeader problemsCount={problemsCount} problemIndex={problemIndex} />
      <GameBox>
        <ProblemWrapper ref={problemRef}>
          <Problem
            id={formattedProblemNum}
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
        <Resizer ref={resizerRef} />
        <CodeEditorWrapper ref={codeEditorRef}>
          <CodeEditor />
        </CodeEditorWrapper>
      </GameBox>
    </GameLayout>
  );
};
