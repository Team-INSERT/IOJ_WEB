import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { contestProblem } from "@/pages/room/api/roomApi";
import Clock from "@/assets/Clock";
import { getGameDetails } from "@/pages/game/api/getGameDetails";
import { gameDetail } from "@/pages/game/api/gameDetail";
import Button from "../Button";
import * as S from "./style";

interface gameHeaderProps {
  problemsCount: number;
  problemIndex: number;
  noHeader?: boolean;
  title?: string;
}

interface problemsType {
  id: number;
  level?: number;
  status?: string;
  title?: string;
}

interface ContestDetails {
  problems: problemsType[];
  startTime: string;
  endTime: string;
}

const GameHeader = ({
  problemsCount,
  problemIndex,
  noHeader = false,
  title = "게임 기본 제목",
}: gameHeaderProps) => {
  const { pathname } = window.location;
  const navigate = useNavigate();
  const segments = pathname.split("/");
  const contestId = parseInt(segments[segments.length - 3], 10);
  const roomId = segments[segments.length - 3];

  const [problemList, setProblemList] = useState<problemsType[]>([]);
  const [remainingTime, setRemainingTime] = useState("00 : 00 : 00");

  const handleExit = () => {
    const newPath = pathname.replace(/\/code\/\d+$/, "");
    navigate(newPath);
  };

  const calculateRemainingTime = (endTime: string) => {
    const endDate = new Date(endTime);
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();

    if (diff <= 0) {
      return "00 : 00 : 00";
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${String(hours).padStart(2, "0")} : ${String(minutes).padStart(
      2,
      "0",
    )} : ${String(seconds).padStart(2, "0")}`;
  };

  useEffect(() => {
    // eslint-disable-next-line no-undef
    let intervalId: NodeJS.Timeout;
    (async () => {
      try {
        const problems = await getGameDetails(roomId);
        const problemIds = problems.problems;

        if (problemIds && problemIds.length > 0) {
          const problemsData = await Promise.all(
            problemIds.map(async (id: number) => {
              const problemDetail = await gameDetail(id);
              return { id, ...problemDetail };
            }),
          );
          setProblemList(problemsData);
          setRemainingTime(calculateRemainingTime(problems.endTime));

          intervalId = setInterval(() => {
            const time = calculateRemainingTime(problems.endTime);
            setRemainingTime(time);

            if (time === "00 : 00 : 00") {
              clearInterval(intervalId);
              setTimeout(async () => {
                navigate(`/game/result/${roomId}`, {
                  state: {
                    title,
                  },
                });
              }, 600);
            }
          }, 1000);
        }
      } catch (err) {
        console.error(err);
      }
    })();
    return () => {
      clearInterval(intervalId);
    };
  }, [roomId, title]);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    let intervalId: NodeJS.Timeout;

    const fetchContestDetails = async () => {
      try {
        const res: ContestDetails = await contestProblem(contestId);
        setRemainingTime(calculateRemainingTime(res.endTime));

        intervalId = setInterval(() => {
          const time = calculateRemainingTime(res.endTime);
          setRemainingTime(time);

          if (time === "00 : 00 : 00") {
            clearInterval(intervalId); // 타이머 중지
          }
        }, 1000);
      } catch (err) {
        console.error(err);
      }
    };

    fetchContestDetails();

    return () => {
      clearInterval(intervalId);
    };
  }, [contestId]);

  const onNextClick = (mode: string) => {
    if (mode === "next") {
      if (problemIndex < problemsCount - 1) {
        const nextProblemId = problemList[problemIndex + 1]?.id;
        navigate(pathname.replace(/\/code\/\d+/, `/code/${nextProblemId}`));
      }
    } else if (mode === "previous") {
      if (problemIndex > 0) {
        const previousProblemId = problemList[problemIndex - 1]?.id;
        navigate(pathname.replace(/\/code\/\d+/, `/code/${previousProblemId}`));
      }
    }
  };

  return (
    <S.Layout>
      <S.GameDetails>
        <Button
          mode="small"
          color="gray"
          font="nexon"
          onClick={() => onNextClick("previous")}
        >
          이전
        </Button>
        <S.QuestionNumber>
          {problemIndex + 1}/{problemsCount}
        </S.QuestionNumber>
        <Button
          mode="small"
          color="gray"
          font="nexon"
          onClick={() => onNextClick("next")}
        >
          다음
        </Button>
      </S.GameDetails>
      <S.ClockContainer>
        <S.Clock>
          <Clock />
          <S.Time>{remainingTime}</S.Time>
        </S.Clock>
      </S.ClockContainer>
      <S.Setting>
        <S.LineContainer>{/* <S.Line /> */}</S.LineContainer>
        {noHeader && (
          <Button mode="small" color="red" font="nexon" onClick={handleExit}>
            나가기
          </Button>
        )}
      </S.Setting>
    </S.Layout>
  );
};

export default GameHeader;
