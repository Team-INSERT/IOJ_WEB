import styled from "styled-components";
import { GameHeader } from "@/shared/components";
import { flex } from "@/shared/style";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Split from "react-split";
import Warning from "@/shared/components/Item/warning";
import ItemIconList from "@/shared/components/ItemIconList";
import { useGameInfo } from "@/shared/hooks/useGameInfo";
import OctopusInk from "@/shared/components/Item/octopusInk";
import { Mirror, RotatableContainer } from "@/shared/components/Item/Mirror";
import Devil from "@/shared/components/Item/devil";
import WaterBalloon from "@/shared/components/Item/waterBalloon";
import { CodeEditor } from "./editor";
import { Problem } from "./problem";
import { gameDetail } from "../api/gameDetail";
import { contestProblems } from "../api/contestDetail";
import { problemInfoProps, problemType } from "../interfaces/gameInterfaces";
import { getGameDetails } from "../api/getGameDetails";
import { ChooseAttackModal } from "./chooseAttackModal";

const OverlayItem = styled.div<{ isInkVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: ${({ isInkVisible }) => (isInkVisible ? "none" : "auto")};
`;
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

export const ModalLayout = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [userId, setUserId] = useState(0);
  const refreshItemList = () => setRefreshKey((prev) => prev + 1);
  const {
    isConnected,
    isItemAnimation,
    attackInfo,
    isAddItem,
    setIsAddItem,
    connectWebSocket,
    disconnectWebSocket,
  } = useGameInfo(roomId || "", userId, refreshItemList);

  useEffect(() => {
    connectWebSocket();
    return () => {
      disconnectWebSocket();
    };
  }, []);

  const openModal = (item: string) => {
    setSelectedItem(item); // 아이템을 상태로 저장
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
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
          setUserId(res.userId);

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
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [contestId]);

  const [rotationState, setRotationState] = useState<
    "none" | "first" | "second"
  >("none");

  useEffect(() => {
    if (attackInfo?.item === "MIRROR" && isItemAnimation) {
      setRotationState((prev) => {
        if (prev === "none") return "first";
        if (prev === "first") return "second";
        return "none";
      });
    }
  }, [attackInfo, isItemAnimation]);

  const [isInkVisible, setIsInkVisible] = useState(false);

  useEffect(() => {
    if (attackInfo?.item === "INK" && isItemAnimation) {
      setIsInkVisible(true);
    } else {
      setIsInkVisible(false);
    }
  }, [attackInfo, isItemAnimation]);

  useEffect(() => {
    if (attackInfo?.item === "MIRROR" && isItemAnimation) {
      setRotationState((prev) => {
        if (prev === "none") return "first";
        if (prev === "first") return "second";
        return "none";
      });
    }
  }, [attackInfo, isItemAnimation]);

  useEffect(() => {
    if (isAddItem) {
      refreshItemList();
      setIsAddItem(false); // 상태 초기화로 추가 호출 방지
    }
  }, [isAddItem, refreshItemList]);

  return (
    <>
      {isItemAnimation && attackInfo?.targetUser === userId && (
        <>
          <Warning />
          {attackInfo?.item === "INK" && (
            <OverlayItem isInkVisible={isInkVisible}>
              <OctopusInk />
            </OverlayItem>
          )}
          {attackInfo?.item === "MIRROR" && (
            <OverlayItem isInkVisible={isInkVisible}>
              <RotatableContainer rotationState={rotationState}>
                {/* <Mirror /> */}
              </RotatableContainer>
            </OverlayItem>
          )}
          {attackInfo?.item === "DEVIL" && (
            <OverlayItem isInkVisible={isInkVisible}>
              <Devil />
            </OverlayItem>
          )}
          {attackInfo?.item === "BUBBLE" && (
            <OverlayItem isInkVisible={isInkVisible}>
              <WaterBalloon />
            </OverlayItem>
          )}
        </>
      )}

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
            <ItemIconList
              roomId={roomId}
              openModal={(item: string) => openModal(item)}
              key={refreshKey}
            />
          </ItemListWrapper>
        </Split>
        {isModalOpen && roomId && (
          <ModalLayout>
            <ChooseAttackModal
              roomId={roomId}
              closeModal={closeModal}
              item={selectedItem}
              refreshItemList={refreshItemList}
            />
          </ModalLayout>
        )}
      </GameLayout>
    </>
  );
};
