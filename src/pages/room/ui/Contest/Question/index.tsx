import { Button, Question } from "@/shared/components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { contestProblem } from "@/pages/room/api/roomApi";
import * as S from "./style";

interface problem {
  id: number;
  level: number;
  title: string;
  status: string;
}

export const ContestQuestion = () => {
  const navigate = useNavigate();
  const [problemDetail, setProblemDetail] = useState<problem[]>([]);
  const [query] = useSearchParams();
  const id = query.get("contestId");
  const contestTitle = query.get("contestTitle");

  useEffect(() => {
    const list = async () => {
      if (!id) {
        console.error("Contest ID가 제공되지 않았습니다.");
        return;
      }
      const contestId = parseInt(id, 10);
      try {
        const res = await contestProblem(contestId);
        setProblemDetail(res);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    list();
  }, []);

  const getQuestionNumber = (index: number) => String.fromCharCode(65 + index);

  return (
    <S.Layout>
      <S.TitleContainer>
        <S.Title>{contestTitle}</S.Title>
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
        <S.Time>3시간 25분 17초</S.Time>
        <S.Line />
        <S.ButtonRank>
          <Button mode="small" color="blue">
            순위보러가기
          </Button>
        </S.ButtonRank>
      </S.RemainingTimeContainer>
      <S.QuestionTitle>문제</S.QuestionTitle>
      <S.Question>
        {problemDetail.map((detail, index) => (
          <div key={detail.id} onClick={() => navigate("/game/contest/code")}>
            <Question
              mode={detail.status}
              qustionNumebr={getQuestionNumber(index)}
              number={detail.id}
              title={detail.title}
              level={detail.level}
            />
          </div>
        ))}
      </S.Question>
    </S.Layout>
  );
};
