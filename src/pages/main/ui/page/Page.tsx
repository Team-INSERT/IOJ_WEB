import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameCard, MainHeader } from "@/shared/components";
import { getCookie } from "@/shared/utils/cookie/cookie";
import IojLogo from "@/assets/IojLogo";
import Button from "@/shared/components/Button";
import Person from "@/assets/Person";
import Footer from "@/shared/components/Footer";
import Modal from "@/shared/components/Modal";
import * as S from "./style";

export const Main = () => {
  const navigate = useNavigate();
  const questionCount = "00000";
  const solvedQuestions = "00000";
  const langCount = "6";
  const [isLogin, setIsLogin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = (value: number) => {
    if (value === 0) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (getCookie("accessToken") && getCookie("refreshToken")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  const gameStartClick = () => {
    if (!isLogin) {
      setIsModalOpen(true);
    } else {
      navigate("/game");
    }
  };

  return (
    <>
      <MainHeader />
      <S.BackgroundLayout>
        <S.ContentBox>
          <S.TextBox>
            <S.Title>실시간 코딩 경쟁</S.Title>
            <div>
              <S.SubTitle>아이템을 이용한</S.SubTitle>
              <S.SubTitle>스릴 넘치는 코딩 경기</S.SubTitle>
            </div>
            <div>
              <S.Info>
                폭탄, 문어먹울, 악마와 같은 재미있고 다양한 아이템으로
              </S.Info>
              <S.Info>상대방을 방해해서 이겨봐요!</S.Info>
            </div>
          </S.TextBox>
          <div>
            <Button color="white" mode="big" onClick={gameStartClick}>
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
        <S.AllSubjects>
          <S.SubjectLayout>
            <S.SubjectText>전체 문제 수</S.SubjectText>
            <S.SubjectCount>{questionCount}+</S.SubjectCount>
          </S.SubjectLayout>
          <S.SubjectLayout>
            <S.SubjectText>풀린 문제 수</S.SubjectText>
            <S.SubjectCount>{solvedQuestions}</S.SubjectCount>
          </S.SubjectLayout>
          <S.SubjectLayout>
            <S.SubjectText>현재 개인 순위</S.SubjectText>
            <S.SubjectCount>미공개</S.SubjectCount>
          </S.SubjectLayout>
          <S.SubjectLayout>
            <S.SubjectText>채점 가능한 언어 </S.SubjectText>
            <S.SubjectCount>{langCount}</S.SubjectCount>
          </S.SubjectLayout>
        </S.AllSubjects>
      </S.QuestionLayout>
      <S.RecordLayout>
        <S.RecordTextLayout>
          <S.RecordTitle>나의 기록</S.RecordTitle>
          <S.RecordSubTitle>공개되지 않은 기능입니다</S.RecordSubTitle>
        </S.RecordTextLayout>
        <S.RecordContent>
          {true && <S.Blind />}
          <S.CardLayout>
            <GameCard mode="문제 모아보기" />
            <GameCard mode="역대 전적" />
          </S.CardLayout>
          <S.RankLayout>
            <S.DarkCircle>
              <S.BrightCircle>
                <S.Persent>0%</S.Persent>
              </S.BrightCircle>
            </S.DarkCircle>
            <S.RankInfoLayout>
              <Person />
              <S.RankInfoTexts>
                <S.TopPercent>
                  상위 <S.BlueText>100%</S.BlueText>
                </S.TopPercent>
                <S.PersonCount>
                  <S.BlueText>18000</S.BlueText>명 보다 높은 승률이에요
                </S.PersonCount>
              </S.RankInfoTexts>
            </S.RankInfoLayout>
          </S.RankLayout>
        </S.RecordContent>
      </S.RecordLayout>
      <Footer />
      {isModalOpen && (
        <Modal
          status="나쁨"
          mode="알림"
          title="로그인이 필요한 서비스입니다."
          subtitle="게임하기는 로그인을 필요로 합니다!"
          animation
          onClose={handleModalClose}
        />
      )}
    </>
  );
};
