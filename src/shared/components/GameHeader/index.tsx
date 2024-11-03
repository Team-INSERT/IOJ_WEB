import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { contestProblem } from "@/pages/room/api/roomApi";
import Clock from "@/assets/Clock";
import Button from "../Button";
import * as S from "./style";

interface gameHeaderProps {
  problemsCount: number;
  problemIndex: number;
}

interface problemsType {
  id: number;
  level: number;
  status: string;
  title: string;
}

interface ContestDetails {
  problems: problemsType[];
  startTime: string;
  endTime: string;
}

const GameHeader = ({ problemsCount, problemIndex }: gameHeaderProps) => {
  const { pathname } = window.location;
  const navigate = useNavigate();
  const segments = pathname.split("/");
  const contestId = parseInt(segments[segments.length - 3], 10);

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
      "0"
    )} : ${String(seconds).padStart(2, "0")}`;
  };

  useEffect(() => {
    // eslint-disable-next-line no-undef
    let intervalId: NodeJS.Timeout;

    (async () => {
      try {
        const res: ContestDetails = await contestProblem(contestId);
        setProblemList(res.problems);

        setRemainingTime(calculateRemainingTime(res.endTime));

        intervalId = setInterval(() => {
          setRemainingTime(calculateRemainingTime(res.endTime));
        }, 1000);
      } catch (err) {
        /**/
      }
    })();

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
        <Button mode="small" color="red" font="nexon" onClick={handleExit}>
          나가기
        </Button>
      </S.Setting>
    </S.Layout>
  );
};

export default GameHeader;
