import styled from "styled-components";
import { GameHeader } from "@/shared/components";
import { flex } from "@/shared/style";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Split from "react-split";
import Warning from "@/shared/components/Item/warning";
import ItemIconList from "@/shared/components/ItemIconList";
import { CodeEditor } from "./editor";
import { Problem } from "./problem";
import { gameDetail } from "../api/gameDetail";
import { contestProblems } from "../api/contestDetail";
import { problemInfoProps, problemType } from "../interfaces/gameInterfaces";
import { getGameDetails } from "../api/getGameDetails";

export const GameLayout = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
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

export const ItemListWrapper = styled.div`
  position: absolute;
  top: 20%;
  right: 20px;
  z-index: 1;
`;

export const Game = () => {
  const { problemId, contestId, roomId } = useParams(); // URL 경로에서 problemId와 contestId 가져오기
  const [problem, setProblem] = useState<problemInfoProps>({
    title: "",
    level: 0,
    content: "",
    inputContent: "",
    outputContent: "",
    memoryLimit: 0,
    testcases: [],
    timeLimit: 0,
    source: "",
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

  useEffect(() => {
    if (roomId) {
      (async () => {
        try {
          const res = await getGameDetails(roomId);
          const problemIds = res.problems;

          if (problemIds && problemIds.length > 0) {
            const problemsData = await Promise.all(
              problemIds.map(async (id: number) => {
                const problemDetail = await gameDetail(id);
                return { id, ...problemDetail };
              }),
            );
            setAllProblems(problemsData);
            setProblemsCount(problemsData.length);
          }
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [roomId]);

  useEffect(() => {
    if (problemId) {
      (async () => {
        try {
          const res = await gameDetail(parseInt(problemId, 10));
          setProblem(res);
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [problemId]);

  useEffect(() => {
    if (contestId) {
      (async () => {
        try {
          const res = await contestProblems(parseInt(contestId, 10));
          setAllProblems(res.problems);
          setProblemsCount(res.problems.length);
          console.log("성공2");
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [contestId]);

  return (
    <>
      {/* <Warning /> */}
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
              source={problem.source}
            />
          </ProblemWrapper>
          <CodeEditorWrapper>
            <CodeEditor />
          </CodeEditorWrapper>
          <ItemListWrapper>
            <ItemIconList />
          </ItemListWrapper>
        </Split>
      </GameLayout>
    </>
  );
};
