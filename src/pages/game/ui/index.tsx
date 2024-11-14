import styled from "styled-components";
import { GameHeader } from "@/shared/components";
import { flex } from "@/shared/style";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
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

export const GameLayout = styled.div<{ isWaterBalloonVisible: boolean }>`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  pointer-events: ${({ isWaterBalloonVisible }) =>
    isWaterBalloonVisible ? "none" : "auto"};
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

  const [isVisible, setIsVisible] = useState(false);
  const [isWarningVisible, setIsWarningVisible] = useState(false);
  const [isMirrorOpen, setIsMirrorOpen] = useState(false);
  const [isWaterBalloonVisible, setIsWaterBalloonVisible] = useState(false);
  const codeEditorRef = useRef<HTMLDivElement>(null);

  const refreshItemList = () => setRefreshKey((prev) => prev + 1);
  const {
    isItemAnimation,
    attackInfo,
    isAddItem,
    setIsAddItem,
    connectWebSocket,
    disconnectWebSocket,
    handleAnimationComplete,
  } = useGameInfo(roomId || "", userId, refreshItemList);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (userId !== 0) {
      connectWebSocket();
      return () => {
        disconnectWebSocket();
      };
    }
  }, [userId]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleShieldDefense = async () => {
    const response = await itemDefense({
      roomId: roomId || "",
      item: attackInfo?.item || "",
      attackUser: attackInfo?.attackUser || 0,
    });

    if (response === true) {
      refreshItemList();
      setIsShieldActive(true);
      setIsVisible(false);
      setIsWarningVisible(false);
      handleAnimationComplete();
    } else {
      setIsModalOpen(true);
    }
  };

  const openModal = (item: string) => {
    setSelectedItem(item);

    if (item === "SHIELD") {
      if (isWarningVisible) {
        handleShieldDefense();
      }
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
      setIsShieldActive(false);
      setIsVisible(false);

      setTimeout(() => {
        setIsWarningVisible(false);
        setIsVisible(true);

        if (attackInfo?.item === "MIRROR") {
          setIsMirrorOpen(true);
        } else if (attackInfo?.item === "BUBBLE") {
          setIsWaterBalloonVisible(true);
        }
      }, 2000);
    }
  }, [attackInfo, isItemAnimation, userId]);

  useEffect(() => {
    if (isMirrorOpen && !isShieldActive) {
      setRotationState("first");
      setTimeout(() => {
        setRotationState("second");
        setTimeout(() => {
          setRotationState("none");
          setIsMirrorOpen(false);
        }, 4000);
      }, 5000);
    }
  }, [isMirrorOpen]);

  useEffect(() => {
    if (isWaterBalloonVisible && codeEditorRef.current) {
      codeEditorRef.current.blur();
    }
  }, [isWaterBalloonVisible]);

  return (
    <GameLayout isWaterBalloonVisible={isWaterBalloonVisible}>
      <RotatableContainer rotationState={rotationState}>
        {isItemAnimation &&
          !isShieldActive &&
          attackInfo?.targetUser === userId && (
            <>
              {isWarningVisible && <Warning />}
              {!isShieldActive &&
                !isWarningVisible &&
                attackInfo?.item === "INK" &&
                isVisible && (
                  <OverlayItem isInkVisible={isVisible}>
                    <OctopusInk onAnimationComplete={handleAnimationComplete} />
                  </OverlayItem>
                )}
              {!isShieldActive &&
                isMirrorOpen &&
                attackInfo?.item === "MIRROR" &&
                isVisible && (
                  <OverlayItem isInkVisible={isVisible}>
                    <RotatableContainer
                      rotationState={rotationState}
                      onAnimationComplete={handleAnimationComplete}
                    />
                  </OverlayItem>
                )}
              {!isShieldActive &&
                !isWarningVisible &&
                attackInfo?.item === "DEVIL" &&
                isVisible && (
                  <OverlayItem isInkVisible={isVisible}>
                    <Devil onAnimationComplete={handleAnimationComplete} />
                  </OverlayItem>
                )}
              {!isShieldActive &&
                !isWarningVisible &&
                attackInfo?.item === "BUBBLE" &&
                isVisible && (
                  <OverlayItem isInkVisible={isVisible}>
                    <WaterBalloon
                      onBurstComplete={() => {
                        setIsWaterBalloonVisible(false);
                        handleAnimationComplete();
                      }}
                    />
                  </OverlayItem>
                )}
            </>
          )}

        <GameHeader
          problemsCount={problemsCount}
          problemIndex={problemIndex}
          noHeader={!roomId}
        />
        <Split
          sizes={[50, 50]}
          minSize={200}
          expandToMin={false}
          gutterSize={0}
          direction="horizontal"
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
          <CodeEditorWrapper ref={codeEditorRef}>
            <CodeEditor isInputDisable={isWaterBalloonVisible} />
          </CodeEditorWrapper>
          <ItemListWrapper>
            <ItemIconList
              roomId={roomId}
              openModal={(item: string) => openModal(item)}
              isWarningVisible={isWarningVisible}
              key={refreshKey}
            />
          </ItemListWrapper>
        </Split>
      </RotatableContainer>

      {isShieldActive && (
        <OverlayItem isInkVisible={isVisible}>
          <Shield />
        </OverlayItem>
      )}
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
