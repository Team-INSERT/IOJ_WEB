import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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

const GameHeader = ({ problemsCount, problemIndex }: gameHeaderProps) => {
  const navigate = useNavigate();
  const { pathname } = window.location;
  const segments = pathname.split("/");
  const contestId = parseInt(segments[segments.length - 3], 10);

  const [problemList, setProblemList] = useState<problemsType[]>([]);

  const handleExit = () => {
    const contestPath = pathname.replace(/\/code\/\d+$/, "");
    window.location.href = contestPath;
  };

  useEffect(() => {
    const getContestDetail = async () => {
      try {
        const res = await contestProblem(contestId);
        setProblemList(res.problems);
      } catch (err) {
        console.log(err);
      }
    };
    getContestDetail();
  }, [contestId]);

  const onNextClick = (mode:string) => {
    if (mode === "next") {
      if (problemIndex < problemsCount - 1) {
        const nextProblemId = problemList[problemIndex + 1]?.id;
        const newUrl = pathname.replace(
          /\/code\/\d+/,
          `/code/${nextProblemId}`,
        );
        window.location.href = newUrl;
      }
    }
    else if (mode === "previous") {
      if (problemIndex > 0) {
        const previousProblemId = problemList[problemIndex - 1]?.id;
        const newUrl = pathname.replace(
          /\/code\/\d+/,
          `/code/${previousProblemId}`,
        );
        window.location.href = newUrl;
      }
    }
  };

  return (
    <S.Layout>
      <S.GameDetails>
        <Button mode="small" color="gray" onClick={() => onNextClick("previous")}>
          이전
        </Button>
        <S.QuestionNumber>
          {problemIndex + 1}/{problemsCount}
        </S.QuestionNumber>
        <Button mode="small" color="gray" onClick={() => onNextClick("next")}>
          다음
        </Button>
      </S.GameDetails>
      <S.ClockContainer>
        <S.Clock>
          <Clock />
          <S.Time>00:00</S.Time>
        </S.Clock>
      </S.ClockContainer>
      <S.Setting>
        <Button mode="small" color="gray">
          제출현황
        </Button>
        <S.LineContainer>
          <S.Line />
        </S.LineContainer>
        <Button mode="small" color="red" onClick={handleExit}>
          나가기
        </Button>
      </S.Setting>
    </S.Layout>
  );
};

export default GameHeader;
