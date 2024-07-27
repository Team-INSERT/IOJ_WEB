import { Button, MainHeader } from "@/shared/components";
import * as S from "./style";

export const Admin = () => (
  <>
    <MainHeader />
    <S.Layout>
      <S.Title>CONTEST CREATE</S.Title>
      <S.DevideLine />
      <S.FormLayout>
        <S.NameLayout>
          <S.Subject>대회명</S.Subject>
          <S.Input placeholder="대회명을 입력하세요. (최대 22자)" />
        </S.NameLayout>
        <S.PeriodLayout>
          <S.Subject>대회기간</S.Subject>
          <S.Period>
            <S.DayLayout>
              <S.Date type="date" />
              <S.Time type="time" />
            </S.DayLayout>
            <S.Wave>~</S.Wave>
            <S.DayLayout>
              <S.Date type="date" />
              <S.Time type="time" />
            </S.DayLayout>
          </S.Period>
        </S.PeriodLayout>
        <S.QuestionLayout>
          <S.Subject>문제</S.Subject>
          <S.Input placeholder="문제번호를 입력하세요 (,로 구분)" />
        </S.QuestionLayout>
      </S.FormLayout>
      <S.ListLayout>
        <S.Title>CONTEST LIST</S.Title>
        <Button mode="big" color="blue">
          CREATE
        </Button>
      </S.ListLayout>
      <S.DevideLine />
    </S.Layout>
  </>
);
