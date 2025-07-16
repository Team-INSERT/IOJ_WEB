import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainHeader, Stars, Button } from "@/shared/components";
import { problemList } from "@/pages/problem/api/problemList";
import * as S from "./style";

interface ProblemsType {
  id: number;
  title: string;
  level: number;
  source: string;
}

export const AdminProblemList = () => {
  const navigate = useNavigate();
  const [problems, setProblems] = useState<ProblemsType[]>();

  useEffect(() => {
    (async () => {
      try {
        const res = await problemList();
        setProblems(res);
      } catch (err) {
        console.error("문제 목록을 불러오는데 실패했습니다:", err);
      }
    })();
  }, []);

  const handleEditClick = (problemId: number) => {
    navigate('/admin/question', { 
      state: { 
        editMode: true, 
        problemId 
      } 
    });
  };

  const handleCreateClick = () => {
    navigate('/admin/question');
  };

  return (
    <S.Main>
      <MainHeader />
      <S.Layout>
        <S.Header>
          <S.Title>문제 관리</S.Title>
          <Button mode="small" color="blue" onClick={handleCreateClick}>
            새 문제 만들기
          </Button>
        </S.Header>
        <S.ListLayout>
          <S.ListHeader>
            <S.Attribute>문제 번호</S.Attribute>
            <S.Attribute>제목</S.Attribute>
            <S.Attribute>출처</S.Attribute>
            <S.Attribute>난이도</S.Attribute>
            <S.Attribute>관리</S.Attribute>
          </S.ListHeader>
          <S.ListContent>
            {problems?.map((item) => {
              const formattedId = String(item.id).padStart(4, "0");
              return (
                <S.ProblemLayout key={item.id}>
                  <S.ProblemData>{formattedId}</S.ProblemData>
                  <S.ProblemData>{item.title}</S.ProblemData>
                  <S.ProblemData>{item.source}</S.ProblemData>
                  <S.ProblemData>
                    <Stars read value={item.level} />
                  </S.ProblemData>
                  <S.ProblemData>
                    <S.ActionButton onClick={() => handleEditClick(item.id)}>
                      수정
                    </S.ActionButton>
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