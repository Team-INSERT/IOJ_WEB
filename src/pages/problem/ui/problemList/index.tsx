import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainHeader, Stars } from "@/shared/components";
import { problemList } from "@/pages/problem/api/problemList";

import * as S from "./style";

interface ProblemsType {
  id: number;
  title: string;
  level: number;
  source: string;
}

export const ProblemList = () => {
  const navigate = useNavigate()
  const [problems, setProblems] = useState<ProblemsType[]>();

  useEffect(() => {
    (async () => {
      try {
        const res = await problemList();
        setProblems(res);
      } catch (err) {
        /**/
      }
    })();
  }, []);

  return (
    <S.Main>
      <MainHeader />
      <S.Layout>
        <S.DetailLayout>
          <S.DetailInputs>
            <S.SearchInput placeholder="풀고 싶은 문제 제목, 번호 검색" />
          </S.DetailInputs>
        </S.DetailLayout>
        <S.ListLayout>
          <S.ListHeader>
            <S.Attribute>문제 번호</S.Attribute>
            <S.Attribute>제목</S.Attribute>
            <S.Attribute>출처</S.Attribute>
            <S.Attribute>난이도</S.Attribute>
          </S.ListHeader>
          <S.ListContent>
            {problems?.map((item) => {
              const formattedId = String(item.id).padStart(4, "0")
              return (
                <S.ProblemLayout onClick={() => navigate(`/problem/${item.id}`)}>
                  <S.ProblemData>{formattedId}</S.ProblemData>
                  <S.ProblemData>{item.title}</S.ProblemData>
                  <S.ProblemData>{item.source}</S.ProblemData>
                  <S.ProblemData>
                    <Stars read value={item.level} />
                  </S.ProblemData>
                </S.ProblemLayout>
              );
            })}
          </S.ListContent>
        </S.ListLayout>
      </S.Layout>
    </S.Main>
  );
};
