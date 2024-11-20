import styled from "styled-components";
import { GameHeader } from "@/shared/components";
import { useParams, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Split from "react-split";
import Warning from "@/shared/components/Item/warning";
import ItemIconList from "@/shared/components/ItemIconList";
import { useGameInfo } from "@/shared/hooks/useGameInfo";
import OctopusInk from "@/shared/components/Item/octopusInk";
import Shield from "@/shared/components/Item/shield";
import { RotatableAnimation } from "@/shared/components/Item/Mirror";
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

export const GameLayout = styled.div<{
  isWaterBalloonVisible: boolean;
  isShieldActive: boolean;
}>`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  pointer-events: ${({ isWaterBalloonVisible, isShieldActive }) =>
    isWaterBalloonVisible && !isShieldActive ? "none" : "auto"};
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
  const location = useLocation();
  const gameTitle = location.state?.title || "기본 게임 제목";
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

  const [isVisible, setIsVisible] = useState(false);
  const [isWarningVisible, setIsWarningVisible] = useState(false);
  const [isMirrorOpen, setIsMirrorOpen] = useState(false);
  const [isWaterBalloonVisible, setIsWaterBalloonVisible] = useState(false);
  const codeEditorRef = useRef<HTMLDivElement>(null);
  const [isDevilActive, setIsDevilActive] = useState(false);

  const refreshItemList = () => setRefreshKey((prev) => prev + 1);
  const {
    isItemAnimation,
    attackInfo,
    setAttackInfo,
    isAddItem,
    setIsAddItem,
    isShieldActive,
    setIsShieldActive,
    connectWebSocket,
    disconnectWebSocket,
    handleAnimationComplete,
    processNextAttackInQueue,
    setReceivedAttackQueue,
    handledAttackIds,
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
    if (!attackInfo || !attackInfo.attackItemId) return; // 방어할 공격이 없으면 종료

    try {
      const response = await itemDefense({
        roomId: roomId || "",
        item: attackInfo.item,
        attackItemId: attackInfo.attackItemId,
      });

      if (response) {
        handledAttackIds.current.add(attackInfo.attackItemId);

        setReceivedAttackQueue((prevQueue) =>
          prevQueue.filter(
            (item) => item.attackItemId !== attackInfo.attackItemId,
          ),
        );

        setIsShieldActive(true);
        setIsWaterBalloonVisible(false);

        isItemAnimation.current = false;
        setAttackInfo(null);
      } else {
        console.error("방어 실패:", response);
      }
    } catch (error) {
      console.error("handleShieldDefense 에러:", error);
    }
  };

  const openModal = (item: string) => {
    setSelectedItem(item);

    if (item === "SHIELD") {
      if (isWarningVisible) {
        setIsWaterBalloonVisible(false);
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
          handleAnimationComplete();
        }, 4000);
      }, 5000);
    }
  }, [isMirrorOpen]);

  useEffect(() => {
    if (isWaterBalloonVisible && codeEditorRef.current) {
      codeEditorRef.current.blur();
    }
  }, [isWaterBalloonVisible]);

  useEffect(() => {
    if (
      isItemAnimation &&
      attackInfo?.item === "DEVIL" &&
      attackInfo?.targetUser === userId
    ) {
      setIsDevilActive(true);
    } else {
      setIsDevilActive(false);
    }
  }, [isItemAnimation, attackInfo, userId]);

  return (
    <GameLayout
      isWaterBalloonVisible={isWaterBalloonVisible}
      isShieldActive={isShieldActive}
    >
      <RotatableAnimation rotationState={rotationState}>
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
                    <RotatableAnimation rotationState={rotationState} />
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
                      onAnimationComplete={handleAnimationComplete}
                    />
                  </OverlayItem>
                )}
            </>
          )}

        <GameHeader
          problemsCount={problemsCount}
          problemIndex={problemIndex}
          noHeader={!roomId}
          title={gameTitle}
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
            <CodeEditor
              isInputDisable={isWaterBalloonVisible && !isShieldActive}
              isDevilActive={isDevilActive}
            />
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
      </RotatableAnimation>

      {isShieldActive && (
        <OverlayItem isInkVisible={isVisible}>
          <Shield
            onAnimationComplete={() => {
              console.log("Shield 애니메이션 완료");
              setIsShieldActive(false); // 쉴드 상태 해제
              processNextAttackInQueue(); // 다음 공격 실행
            }}
          />
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
