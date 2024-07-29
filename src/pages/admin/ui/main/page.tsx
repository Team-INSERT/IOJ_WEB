import { Button, Footer, MainHeader } from "@/shared/components";
import React, { useState, useEffect, useRef } from "react";
import { theme } from "@/shared/style";
import * as S from "./style";
import { createContestApi } from "../../api/contestCreate";

export interface postBodyProps  {
  title: string;
  startTime: string;
  endTime: string;
  authority: string;
  problems: number[];
};

export const Admin = () => {
  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const [startDay, setStartDay] = useState({ date: "", time: "" });
  const [endDay, setEndDay] = useState({ date: "", time: "" });
  const [contestName, setContestName] = useState("");
  const [questions, setQuestions] = useState<number[]>([]);
  const [joinAuthority, setJoinAuthority] = useState("");
  const [minEndDate, setMinEndDate] = useState(formattedDate);

  const nameLenghtRef = useRef<HTMLParagraphElement>(null);
  const contestNameInputRef = useRef<HTMLInputElement>(null);

  const questionsString = questions.join(", ");

  const questionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const questionArray = input
      .split(",")
      .map((question) => {
        const num = parseInt(question.trim(), 10);
        return !Number.isNaN(num) ? num : null;
      })
      .filter((question) => question !== null) as number[];
    setQuestions(questionArray);
  };

  const onCreateClick = async () => {
    const startDateTime = `${startDay.date}T${startDay.time}`;
    const endDateTime = `${endDay.date}T${endDay.time}`;
    const todayDateTime = new Date();

    if (contestName.length === 0) {
      alert("대회명을 입력해주세요.");
    } else if (contestName.length < 2 || contestName.length > 22) {
      alert("대회명은 2자 이상 22자 이하여야합니다!");
    } else if (startDateTime.length !== 16 || endDateTime.length !== 16) {
      alert("날짜와 시간을 모두 선택해주세요.");
    } else if (new Date(startDateTime) <= todayDateTime) {
      alert("시작 날짜와 시간은 현재 시각 이후여야 합니다.");
    } else if (questions.length === 0) {
      alert("문제를 하나 이상 추가해주세요.");
    } else if (endDateTime <= startDateTime) {
      alert(
        "끝나는 날짜와 시간이 시작되는 날짜와 시간보다 이전이거나 같을 수 없습니다!",
      );
    } else if (joinAuthority === "") {
      alert("참가 권한을 선택해주세요");
    } else {
      try {
        const postBody: postBodyProps = {
          title: contestName,
          startTime: startDateTime,
          endTime: endDateTime,
          authority: joinAuthority,
          problems: questions,
        };
        await createContestApi(postBody);
        alert("대회가 성공적으로 생성되었습니다!");
        
        setContestName("")
        setStartDay({date: "", time: ""})
        setEndDay({date: "", time: ""})
        setQuestions([])
        setJoinAuthority("")
      } catch (err) {
        console.error(err);
        alert("대회 생성에 실패했습니다.");
      }
    }
  };

  useEffect(() => {
    if (startDay.date) {
      setMinEndDate(startDay.date);
    }
  }, [startDay.date]);

  useEffect(() => {
    if (nameLenghtRef.current && contestNameInputRef.current) {
      const lengthColor = contestName.length === 0 ? theme.black : contestName.length <= 22 ? theme.correctGreen : theme.warningRed;
      const borderColor = lengthColor;
      nameLenghtRef.current.style.color = lengthColor;
      contestNameInputRef.current.style.borderBottom = `1px solid ${borderColor}`;
    }
  }, [contestName]);

  return (
    <>
      <MainHeader />
      <S.Layout>
        <S.Title>CONTEST CREATE</S.Title>
        <S.DevideLine />
        <S.FormLayout>
          <S.NameLayout>
            <S.InputLayout>
              <S.Subject>대회명</S.Subject>
              <S.Input
                ref={contestNameInputRef}
                placeholder="대회명을 입력하세요. (최소 2자, 최대 22자)"
                value={contestName}
                onChange={(e) => setContestName(e.target.value)}
              />
            </S.InputLayout>
            <p ref={nameLenghtRef}>글자 수 : {contestName.length} </p>
          </S.NameLayout>
          <S.PeriodLayout>
            <S.Subject>대회기간</S.Subject>
            <S.Period>
              <S.DayLayout>
                <S.Date
                  type="date"
                  onChange={(e) =>
                    setStartDay((prev) => ({ ...prev, date: e.target.value }))
                  }
                  min={formattedDate}
                  value={startDay.date}
                />
                <S.Time
                  type="time"
                  onChange={(e) =>
                    setStartDay((prev) => ({ ...prev, time: e.target.value }))
                  }
                  value={startDay.time}
                />
              </S.DayLayout>
              <S.Wave>~</S.Wave>
              <S.DayLayout>
                <S.Date
                  type="date"
                  onChange={(e) =>
                    setEndDay((prev) => ({ ...prev, date: e.target.value }))
                  }
                  min={minEndDate}
                  value={endDay.date}
                />
                <S.Time
                  type="time"
                  onChange={(e) =>
                    setEndDay((prev) => ({ ...prev, time: e.target.value }))
                  }
                  value={endDay.time}
                />
              </S.DayLayout>
            </S.Period>
          </S.PeriodLayout>
          <S.QuestionLayout>
            <S.Subject>문제</S.Subject>
            <S.Input
              placeholder="문제번호를 입력하세요 (,로 구분)"
              onChange={questionChange}
              value={questionsString}
            />
          </S.QuestionLayout>
          <S.AuthorityLayout>
            <S.Subject>참가 권한</S.Subject>
            <S.Select onChange={(e) => setJoinAuthority(e.target.value)}>
              <S.Option value="" disabled hidden selected>
                권한 선택
              </S.Option>
              <S.Option value="USER">모든 사용자</S.Option>
              <S.Option value="FIRST_YEAR">1학년</S.Option>
              <S.Option value="SECOND_YEAR">2학년</S.Option>
              <S.Option value="THIRD_YEAR">3학년</S.Option>
            </S.Select>
          </S.AuthorityLayout>
        </S.FormLayout>
        <S.ListLayout>
          <S.Title>CONTEST LIST</S.Title>
          <Button mode="big" color="blue" onClick={onCreateClick}>
            CREATE
          </Button>
        </S.ListLayout>
        <S.DevideLine />
      </S.Layout>
      <Footer />
    </>
  );
};
