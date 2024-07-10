import IojLogo from "../../../..//assets/IojLogo";
import Button from "../../../../shared/components/Button";
import { MainHeader } from "../../../../shared/components";
import * as S from "./style";

export const Main = () => {
  return (
    <>
      <MainHeader />
      <S.BackgroundLayout>
        <S.ContentBox>
          <S.TextBox>
            <S.Title>실시간 코딩 경쟁</S.Title>
            <S.SubTitle>
              아이템을 이용한
              <br />
              스릴 넘치는 코딩 경기
            </S.SubTitle>
            <S.Info>
              폭탄, 문어먹울, 악마와 같은 재미있고 다양한 아이템으로
              <br />
              상대방을 방해해서 이겨봐요!
            </S.Info>
          </S.TextBox>
          <div>
            <Button color="white" mode="big">
              게임 바로가기
            </Button>
          </div>
        </S.ContentBox>
      </S.BackgroundLayout>
      <S.ExplainLayout>
        <S.ExplainContent>
          <IojLogo width="180px" height="51.153px" />
          <S.DevideLine />
          <S.ExplainText>
            인서트 온라인 저지에서 온라인으로 상대방과 코딩 경쟁을 할 수
            있습니다
          </S.ExplainText>
        </S.ExplainContent>
      </S.ExplainLayout>
      <S.QuestionLayout>
        <S.AllQuestions></S.AllQuestions>
      </S.QuestionLayout>
    </>
  );
};
