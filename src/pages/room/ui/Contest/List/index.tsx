import { Button, ContestTitle } from "@/shared/components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { contestList } from "@/pages/game/api/gameApi";
import * as S from "./style";

interface contest {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
}

export const ContestList = () => {
  const navigate = useNavigate();
  const [contestDetail, setContestDetail] = useState<contest[]>([]);

  useEffect(() => {
    const list = async () => {
      try {
        const res = contestList();
        setContestDetail(await res);
      } catch (err) {
        console.log(err);
      }
    };
    list();
  }, []);

  return (
    <S.Layout>
      <S.ContentLayout>
        <S.TitleContainer>
          <S.Title>대회목록</S.Title>
          <S.Button>
            <Button mode="small" color="red" onClick={() => navigate("/game")}>
              뒤로가기
            </Button>
          </S.Button>
        </S.TitleContainer>
        <S.ContestList>
          {contestDetail.map((detail) => (
            <div
              key={detail.id}
              onClick={() =>
                navigate(
                  `/game/contest/questions?contestId=${detail.id}&contestTitle=${encodeURIComponent(
                    detail.title,
                  )}`,
                )
              }
            >
              <ContestTitle
                title={detail.title}
                date={`${detail.startTime} ~ ${detail.endTime}`}
              />
            </div>
          ))}
        </S.ContestList>
      </S.ContentLayout>
    </S.Layout>
  );
};
