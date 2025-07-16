import { Button, Footer, MainHeader } from "@/shared/components";
import { useNavigate } from "react-router-dom";
import * as S from "./style";

export const Start = () => {
  const navigate = useNavigate();

  const handleClick = (type: string) => {
    if (type === "contest") {
      navigate("/admin/contest");
    } else if (type === "question") {
      navigate("/admin/question");
    } else if (type === "problems") {
      navigate("/admin/problems");
    }
  };

  return (
    <>
      <MainHeader />
      <S.StartLayout>
        <S.CreateContest>
          <Button
            mode="big"
            color="blue"
            onClick={() => handleClick("contest")}
          >
            대회 만들기
          </Button>
        </S.CreateContest>
        <S.Divider />
        <S.CreateQ>
          <Button
            mode="big"
            color="blue"
            onClick={() => handleClick("question")}
          >
            문제 만들기
          </Button>
        </S.CreateQ>
        <S.Divider />
        <S.ManageProblems>
          <Button
            mode="big"
            color="orange"
            onClick={() => handleClick("problems")}
          >
            문제 관리
          </Button>
        </S.ManageProblems>
      </S.StartLayout>
      <Footer />
    </>
  );
};
