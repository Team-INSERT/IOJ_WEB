import { Button, Footer, MainHeader } from "@/shared/components";
import React, { useState, useEffect, useRef } from "react";
import { theme } from "@/shared/style";
import Modal from "@/shared/components/Modal";
import * as S from "./style";
import { createContestApi } from "../../api/contestCreate";

export interface postBodyProps {
  title: string;
  startTime: string;
  endTime: string;
  authority: string;
  problems: number[];
}

export const CreateContest = () => {
  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const [startDay, setStartDay] = useState({ date: "", time: "" });
  const [endDay, setEndDay] = useState({ date: "", time: "" });
  const [contestName, setContestName] = useState("");
  const [questions, setQuestions] = useState<number[]>([]);
  const [joinAuthority, setJoinAuthority] = useState("");
  const [minEndDate, setMinEndDate] = useState(formattedDate);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalSubtitle, setModalSubitle] = useState("");
  const [modalStatus, setModalStatus] = useState<"나쁨" | "좋음">("나쁨");

  const nameLenghtRef = useRef<HTMLParagraphElement>(null);
  const contestNameInputRef = useRef<HTMLInputElement>(null);

  const questionsString = questions.join(", ");

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const showModal = (
    status: "나쁨" | "좋음",
    title: string,
    subtitle: string,
  ) => {
    setModalStatus(status);
    setModalTitle(title);
    setModalSubitle(subtitle);
    setIsModalOpen(true);
  };

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
      showModal(
        "나쁨",
        "대회명을 입력해주세요.",
        "대회명은 필수로 입력되어야 합니다!",
      );
    } else if (contestName.length < 2 || contestName.length > 22) {
      showModal(
        "나쁨",
        "대회명을 입력해주세요.",
        "대회명은 2자 이상 22자 이하여야합니다!",
      );
    } else if (startDateTime.length !== 16 || endDateTime.length !== 16) {
      showModal(
        "나쁨",
        "날짜와 시간을 입력해주세요.",
        "날짜와 시간은 모두 입력되어야 합니다!",
      );
    } else if (new Date(startDateTime) <= todayDateTime) {
      showModal(
        "나쁨",
        "날짜와 시간을 입력해주세요.",
        "시작 날짜와 시간은 현재 시각 이후여야 합니다.",
      );
    } else if (questions.length === 0) {
      showModal(
        "나쁨",
        "문제를 입력해주세요.",
        "문제는 한가지 이상 추가되어야 합니다!",
      );
    } else if (endDateTime <= startDateTime) {
      showModal(
        "나쁨",
        "날짜와 시간을 입력해주세요.",
        "끝나는 날짜와 시간이 시작되는 날짜와 시간보다 이전이거나 같을 수 없습니다!",
      );
    } else if (joinAuthority === "") {
      showModal(
        "나쁨",
        "참가 권한을 선택해주세요.",
        "참가 권한은 필수로 지정되어야 합니다!",
      );
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
        showModal(
          "좋음",
          "대회 생성에 성공하였습니다!",
          "대회가 성공적으로 생성되었습니다!",
        );
        setContestName("");
        setStartDay({ date: "", time: "" });
        setEndDay({ date: "", time: "" });
        setQuestions([]);
        setJoinAuthority("");
      } catch (err) {
        console.error(err);
        showModal(
          "나쁨",
          "대회 생성에 실패하였습니다.",
          "사용자의 네트워크 연결상태를 확인해주세요.",
        );
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
      const lengthColor =
        contestName.length === 0
          ? theme.black
          : contestName.length <= 22
            ? theme.correctGreen
            : theme.warningRed;
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
      {isModalOpen && (
        <Modal
          status={modalStatus}
          mode="알림"
          title={modalTitle}
          subtitle={modalSubtitle}
          onClose={handleModalClose}
          animation
        />
      )}
    </>
  );
};
