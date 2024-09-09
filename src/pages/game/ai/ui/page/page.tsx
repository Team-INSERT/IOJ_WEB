import { MainHeader, Stars } from "@/shared/components";
import { Pie, Radar } from "react-chartjs-2";
import Tag from "@/assets/Tag.svg";
import {
  Chart,
  RadarController,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
} from "chart.js";
import { useEffect, useState } from "react";
import { deleteCookie, getCookie } from "@/shared/utils/cookie/cookie";
import { customAxios } from "@/shared/utils/customAxios";
import * as S from "./style";

Chart.register(
  RadarController,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
);

export const Ai = () => {
  const [nameData, setNameData] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("name");

    if (data) {
      try {
        const parsedData = JSON.parse(data);
        setNameData(parsedData);
      } catch (error) {
        console.error("Error parsing JSON from localStorage:", error);
        setNameData(data);
      }
    }
  }, []);
  const onLogoutClick = async () => {
    try {
      const refreshToken = getCookie("refreshToken");
      await customAxios.delete("/auth", {
        data: { refreshToken },
      });
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      localStorage.removeItem("name");
      localStorage.removeItem("color");
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  const circleData = {
    datasets: [
      {
        label: "# of Votes",
        data: [5, 5, 15, 20, 25],
        backgroundColor: [
          "#002B59",
          "#004A99",
          "#003873",
          "#0063CC",
          "#007CFF",
        ],
        borderColor: ["#fff", "#fff", "#fff", "#fff", "#fff"],
        borderWidth: 1,
      },
    ],
  };

  const pentagonData = {
    labels: ["Math", "Greedy", "Implementation", "Data Structure", "String"],
    datasets: [
      {
        label: "Skill Distribution",
        data: [70, 20, 10, 0, 0],
        borderColor: "#007CFF",
        backgroundColor: "rgba(0, 124, 255, 0.2)",
        borderWidth: 3,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          stepSize: 25,
        },
        pointLabels: {
          display: true,
          color: "black",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
    responsive: true,
  };

  const circleGraghDetail = [
    { id: 1, level: 1, problem: 70, percent: "70%" },
    { id: 2, level: 2, problem: 20, percent: "20%" },
    { id: 3, level: 3, problem: 10, percent: "10%" },
    { id: 4, level: 4, problem: 0, percent: "0%" },
    { id: 5, level: 5, problem: 0, percent: "0%" },
  ];
  const pentagonGraghDetail = [
    { id: 1, tag: "#수학", problem: 70, percent: "70%" },
    { id: 2, tag: "#정렬", problem: 20, percent: "20%" },
    { id: 3, tag: "자료구조", problem: 10, percent: "10%" },
    { id: 4, tag: "#그리디 알고리즘", problem: 0, percent: "0%" },
    { id: 5, tag: "#정수론", problem: 0, percent: "0%" },
  ];

  return (
    <>
      <MainHeader />
      <S.MyPageLayout>
        <S.ProfileDetail>
          <S.NameContainer>
            <S.RowLine />
            <S.Name>{nameData}</S.Name>
          </S.NameContainer>
          <S.Line />
          <S.MyProfile>내 프로필</S.MyProfile>
          <S.Line />
          <S.SubmitTotal>제출 통계</S.SubmitTotal>
          <S.Line />
          {nameData ? (
            <S.Logout onClick={onLogoutClick}>로그아웃</S.Logout>
          ) : (
            <S.Logout>로그인하세요</S.Logout>
          )}

          <S.Line />
        </S.ProfileDetail>
        <S.AiLayout>
          <S.Evaluation>
            최근에는 경기에 많이 참여하셨군요!🔥 하지만 그리디 알고리즘, 정수론
            부분에서는 부진한 성적을 받으셨습니다. 더이상 패배하지 않기 위해서는
            더욱더 분발이 필요합니다!
          </S.Evaluation>
          <S.GraghContainer>
            <S.GraphNameDetail>
              <img src={Tag} alt="로고" />
              <S.GraphName>난이도 분포</S.GraphName>
            </S.GraphNameDetail>
            <S.SolutionNumber>
              13<S.ThinText>문제 해결</S.ThinText>
            </S.SolutionNumber>
            <S.CircleGraphLayout>
              <S.Graph>
                <Pie data={circleData} options={{ responsive: true }} />
              </S.Graph>
              <S.GraphDetail>
                <S.GraphDetailRow>
                  <S.GraphTag1>레벨</S.GraphTag1>
                  <S.GraphTag2>문제</S.GraphTag2>
                  <S.GraphTag3>백분율</S.GraphTag3>
                </S.GraphDetailRow>
                <S.LongLine />
                {circleGraghDetail.map((detail) => (
                  <div key={detail.id}>
                    <S.GraphDetailRow>
                      <Stars read value={detail.level} />
                      <S.ProblemText>{detail.problem}</S.ProblemText>
                      <S.PercentText>{detail.percent}</S.PercentText>
                    </S.GraphDetailRow>
                    <S.LongLine />
                  </div>
                ))}
              </S.GraphDetail>
            </S.CircleGraphLayout>
          </S.GraghContainer>
          <S.GraghContainer>
            <S.GraphNameDetail>
              <img src={Tag} alt="로고" />
              <S.GraphName>태그 분포</S.GraphName>
            </S.GraphNameDetail>
            <S.PentagonGraphLayout>
              <S.Graph>
                <Radar data={pentagonData} options={options} />
              </S.Graph>
              <S.GraphDetail>
                <S.GraphDetailRow>
                  <S.GraphTag1>태그</S.GraphTag1>
                  <S.GraphTag2>문제</S.GraphTag2>
                  <S.GraphTag3>백분율</S.GraphTag3>
                </S.GraphDetailRow>
                <S.LongLine />
                {pentagonGraghDetail.map((detail) => (
                  <div key={detail.id}>
                    <S.GraphDetailRow>
                      <S.TagText>{detail.tag}</S.TagText>
                      <S.ProblemText>{detail.problem}</S.ProblemText>
                      <S.PercentText>{detail.percent}</S.PercentText>
                    </S.GraphDetailRow>
                    <S.LongLine />
                  </div>
                ))}
              </S.GraphDetail>
            </S.PentagonGraphLayout>
          </S.GraghContainer>
        </S.AiLayout>
      </S.MyPageLayout>
    </>
  );
};
