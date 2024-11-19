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
      </S.StartLayout>
      <Footer />
    </>
  );
};
