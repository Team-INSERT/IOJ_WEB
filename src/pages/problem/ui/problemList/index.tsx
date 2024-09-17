import React from "react";
import { MainHeader, Stars } from "@/shared/components";

import * as S from "./style";

export const ProblemList = () => {
  console.log();
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
            <S.Attribute>난이도</S.Attribute>
          </S.ListHeader>
          <S.ListContent>
            <S.ProblemLayout>
              <S.ProblemData>0001</S.ProblemData>
              <S.ProblemData>제목입니다</S.ProblemData>
              <S.ProblemData>
                <Stars read value={3} />
              </S.ProblemData>
            </S.ProblemLayout>
            <S.ProblemLayout>
              <S.ProblemData>0001</S.ProblemData>
              <S.ProblemData>제목입니다</S.ProblemData>
              <S.ProblemData>
                <Stars read value={3} />
              </S.ProblemData>
            </S.ProblemLayout>
            <S.ProblemLayout>
              <S.ProblemData>0001</S.ProblemData>
              <S.ProblemData>제목입니다</S.ProblemData>
              <S.ProblemData>
                <Stars read value={3} />
              </S.ProblemData>
            </S.ProblemLayout>
            <S.ProblemLayout>
              <S.ProblemData>0001</S.ProblemData>
              <S.ProblemData>제목입니다</S.ProblemData>
              <S.ProblemData>
                <Stars read value={3} />
              </S.ProblemData>
            </S.ProblemLayout>
            <S.ProblemLayout>
              <S.ProblemData>0001</S.ProblemData>
              <S.ProblemData>제목입니다</S.ProblemData>
              <S.ProblemData>
                <Stars read value={3} />
              </S.ProblemData>
            </S.ProblemLayout>
          </S.ListContent>
        </S.ListLayout>
      </S.Layout>
    </S.Main>
  );
};
