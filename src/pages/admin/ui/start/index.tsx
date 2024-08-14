import { Button, Footer, MainHeader } from "@/shared/components";
import { useNavigate } from "react-router-dom";
import * as S from "./style";

export const Start = () => {
  const navigate = useNavigate();

  const onContestClick = () => {
    navigate("/admin/main");
  };
  return (
    <>
      <MainHeader />
      <S.StartLayout>
        <S.CreateContest>
          <Button mode="big" color="blue" onClick={onContestClick}>
            대회 만들기
          </Button>
        </S.CreateContest>
        <S.Divider />
        <S.CreateQ>
          <Button mode="big" color="blue">
            문제 만들기
          </Button>
        </S.CreateQ>
      </S.StartLayout>
      <Footer />
    </>
  );
};
