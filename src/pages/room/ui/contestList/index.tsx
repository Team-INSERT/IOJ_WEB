import { Button, ContestTitle } from "@/shared/components";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { contestList } from "@/pages/room/api/roomApi";
import * as S from "./style";

interface contest {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
}

export const ContestList = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedDate = `${month.toString().padStart(2, "0")}/${day.toString().padStart(2, "0")} ${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    return formattedDate;
  };

  const navigate = useNavigate();
  const location = useLocation();
  const [contestDetail, setContestDetail] = useState<contest[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = contestList();
        setContestDetail(await res);
      } catch (err) {
        /**/
      }
    })();
  }, []);

  const getRoute = () => {
    if (location.pathname.startsWith("/contest/list")) {
      return "/";
    }
    if (location.pathname.startsWith("/game")) {
      return "/game";
    }
    return "/";
  };

  return (
    <S.Layout>
      <S.ContentLayout>
        <S.TitleContainer>
          <S.Title>대회목록</S.Title>
          <S.Button>
            <Button
              mode="small"
              color="red"
              onClick={() => navigate(getRoute())}
            >
              뒤로가기
            </Button>
          </S.Button>
        </S.TitleContainer>
        <S.ContestList>
          {contestDetail.map((detail) => (
            <div
              key={detail.id}
              onClick={() => navigate(`/game/contest/${detail.id}`)}
            >
              <ContestTitle
                title={detail.title}
                date={`${formatDate(`${detail.startTime}`)} ~ ${formatDate(
                  `${detail.endTime}`,
                )}`}
              />
            </div>
          ))}
        </S.ContestList>
      </S.ContentLayout>
    </S.Layout>
  );
};
