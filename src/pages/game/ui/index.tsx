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
import Shield from "@/shared/components/Item/shield";
import { RotatableContainer } from "@/shared/components/Item/Mirror";
import Devil from "@/shared/components/Item/devil";
import WaterBalloon from "@/shared/components/Item/waterBalloon";
import { CodeEditor } from "./editor";
import { Problem } from "./problem";
import { gameDetail } from "../api/gameDetail";
import { contestProblems } from "../api/contestDetail";
import { problemInfoProps, problemType } from "../interfaces/gameInterfaces";
import { getGameDetails } from "../api/getGameDetails";
import { itemDefense } from "../api/itemDefense";
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
  const { problemId, contestId, roomId } = useParams();
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
  const [isShieldActive, setIsShieldActive] = useState(false);

  const refreshItemList = () => setRefreshKey((prev) => prev + 1);
  const {
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

  const handleShieldDefense = async () => {
    const response = await itemDefense({
      roomId: roomId || "",
      item: attackInfo?.item || "",
      attackUser: attackInfo?.attackUser || 0,
    });

    if (response === true) {
      setIsShieldActive(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = (item: string) => {
    setSelectedItem(item);
    if (item === "SHIELD") {
      handleShieldDefense();
    } else {
      setIsModalOpen(true);
    }
  };

  const [problemsCount, setProblemsCount] = useState(0);
  const [allProblems, setAllProblems] = useState<problemType[]>([]);

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

  const [isVisible, setIsVisible] = useState(false);
  const [isWarningVisible, setIsWarningVisible] = useState(true);

  useEffect(() => {
    if (isAddItem) {
      refreshItemList();
      setIsAddItem(false);
    }
  }, [isAddItem, refreshItemList]);

  const [rotationState, setRotationState] = useState<
    "none" | "first" | "second"
  >("none");

  useEffect(() => {
    if (isItemAnimation && attackInfo?.targetUser === userId) {
      setIsWarningVisible(true);
      setIsVisible(false);

      setTimeout(() => {
        setIsWarningVisible(false);
        setIsVisible(true);
      }, 2000);
      if (attackInfo?.item === "MIRROR" && attackInfo?.targetUser === userId) {
        setRotationState("first");
        setTimeout(() => {
          setRotationState("second");
          setTimeout(() => {
            setRotationState("none");
          }, 600);
        }, 5000);
      }
    }
  }, [attackInfo, isItemAnimation, userId]);

  return (
    <GameLayout>
      <RotatableContainer rotationState={rotationState}>
        {isItemAnimation && attackInfo?.targetUser === userId && (
          <>
            <Warning />
            {attackInfo?.item === "INK" && isVisible && (
              <OverlayItem isInkVisible={isVisible}>
                <OctopusInk />
              </OverlayItem>
            )}
            {attackInfo?.item === "MIRROR" && isVisible && (
              <OverlayItem isInkVisible={isVisible}>
                <RotatableContainer rotationState={rotationState} />
              </OverlayItem>
            )}
            {attackInfo?.item === "DEVIL" && isVisible && (
              <OverlayItem isInkVisible={isVisible}>
                <Devil />
              </OverlayItem>
            )}
            {attackInfo?.item === "BUBBLE" && isVisible && (
              <OverlayItem isInkVisible={isVisible}>
                <WaterBalloon />
              </OverlayItem>
            )}
          </>
        )}

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
      </RotatableContainer>

      {isShieldActive && <Shield />}
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
  );
};
