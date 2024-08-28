import { Button, Question } from "@/shared/components";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { contestProblem } from "@/pages/room/api/roomApi";
import ErrorModal from "@/shared/components/ErrorModal";
import * as S from "./style";

interface Problem {
  id: number;
  level: number;
  title: string;
  status: string;
}

interface Contest {
  title: string;
  endTime: string;
  problems: Problem[];
}

export const ContestQuestion = () => {
  const navigate = useNavigate();
  const [contestDetail, setContestDetail] = useState<Contest | null>(null);
  const [remainingTime, setRemainingTime] = useState<string>("");
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const { contestId } = useParams<{ contestId: string }>();

  useEffect(() => {
    const list = async () => {
      if (!contestId) {
        console.error("Contest ID가 제공되지 않았습니다.");
        return;
      }
      try {
        const res: Contest = await contestProblem(parseInt(contestId, 10));
        setContestDetail(res);
      } catch (err: any) {
        if (err.response) {
          setErrorCode(err.response.data.code);
        } else {
          setErrorCode("UNKNOWN");
        }
      }
    };
    list();
  }, [contestId]);

  const calculateRemainingTime = (endTime: string) => {
    const end = new Date(endTime).getTime();
    const now = new Date().getTime();
    const distance = end - now;

    if (distance < 0) {
      setRemainingTime("종료되었습니다");
      return;
    }

    const hours = Math.floor(distance / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    setRemainingTime(`${hours}시간 ${minutes}분 ${seconds}초`);
  };

  useEffect(() => {
    if (contestDetail) {
      const interval = setInterval(() => {
        calculateRemainingTime(contestDetail.endTime);
      }, 1000);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [contestDetail]);

  const getQuestionNumber = (index: number) => String.fromCharCode(65 + index);

  if (errorCode) {
    return (
      <ErrorModal
        errorCode={errorCode}
        onClose={() => navigate("/game/contest")}
      />
    );
  }

  if (!contestDetail) {
    return <div>Loading...</div>;
  }

  return (
    <S.Layout>
      <S.TitleContainer>
        <S.Title>{contestDetail.title}</S.Title>
        <S.Button>
          <Button
            mode="small"
            color="red"
            onClick={() => navigate("/game/contest")}
          >
            뒤로가기
          </Button>
        </S.Button>
      </S.TitleContainer>
      <S.RemainingTimeContainer>
        <S.Time>{remainingTime}</S.Time>
        <S.Line />
        <S.ButtonRank>
          <Button
            mode="small"
            color="blue"
            onClick={() => {
              navigate(`/game/contest/ranking/${contestId}`, {
                state: { title: contestDetail.title },
              });
            }}
          >
            순위보러가기
          </Button>
        </S.ButtonRank>
      </S.RemainingTimeContainer>
      <S.QuestionTitle>문제</S.QuestionTitle>
      <S.Question>
        {contestDetail.problems.map((problem, index) => (
          <div
            key={problem.id}
            onClick={() =>
              navigate(`/game/contest/${contestId}/code/${problem.id}`)
            }
          >
            <Question
              mode={problem.status}
              qustionNumebr={getQuestionNumber(index)}
              number={problem.id}
              title={problem.title}
              level={problem.level}
            />
          </div>
        ))}
      </S.Question>
    </S.Layout>
  );
};
