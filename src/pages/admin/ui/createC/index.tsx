import { validateContest } from "@/shared/helper/validateContestHelper";
import { Button, Footer, MainHeader } from "@/shared/components";
import React, { useState, useEffect, useRef } from "react";
import { theme } from "@/shared/style";
import Modal from "@/shared/components/Modal";
import { adminContestList } from "@/pages/admin/api/adminContestList";
import * as S from "./style";
import { createContestApi } from "../../api/contestCreate";

export interface postBodyProps {
  title: string;
  startTime: string;
  endTime: string;
  authority: string;
  problems: number[];
}

export interface contestTypes {
  authority: string;
  endTime: string;
  id: number;
  problemIds: number[];
  startTime: string;
  title: string;
}

export interface contestInfoType {
  label: string;
  value: string;
}

const ContestInfo = ({ label, value }: contestInfoType) => (
  <S.TextLayout>
    <S.ContestText>{label}</S.ContestText>
    <S.TextDeviceLine />
    <S.ContestText>{value}</S.ContestText>
  </S.TextLayout>
);

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
  const [modalSubtitle, setModalSubtitle] = useState("");
  const [modalStatus, setModalStatus] = useState<"나쁨" | "좋음">("나쁨");
  const [contests, setContests] = useState<contestTypes[]>([]);
  const [questionInput, setQuestionInput] = useState("");

  const nameLengthRef = useRef<HTMLParagraphElement>(null);
  const contestNameInputRef = useRef<HTMLInputElement>(null);

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
    setModalSubtitle(subtitle);
    setIsModalOpen(true);
  };

  const onCreateClick = async () => {
    const startDateTime = `${startDay.date}T${startDay.time}`;
    const endDateTime = `${endDay.date}T${endDay.time}`;
    const todayDateTime = new Date();

    const validationResult = validateContest(
      contestName,
      startDateTime,
      endDateTime,
      todayDateTime,
      questions,
      joinAuthority
    );

    if (!validationResult.valid) {
      showModal(
        validationResult.status,
        validationResult.title,
        validationResult.subtitle
      );
      return;
    }

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
        setQuestionInput("")
        setJoinAuthority("");
      } catch (err) {
        showModal(
          "나쁨",
          "대회 생성에 실패하였습니다.",
          "사용자의 네트워크 연결상태를 확인해주세요.",
        );
      }
  };

  const onQuestionInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionInput(e.target.value);

    const questionNumbers = questionInput
      .split(",")
      .map((num) => num.trim())
      .filter((num) => !Number.isNaN(Number(num)) && num !== "")
      .map(Number);

    setQuestions(questionNumbers);
  };

  useEffect(() => {
    if (startDay.date) {
      setMinEndDate(startDay.date);
    }
  }, [startDay.date]);

  useEffect(() => {
    if (nameLengthRef.current && contestNameInputRef.current) {
      const lengthColor =
        contestName.length === 0
          ? theme.black
          : contestName.length <= 22
            ? theme.correctGreen
            : theme.warningRed;
      const borderColor = lengthColor;
      nameLengthRef.current.style.color = lengthColor;
      contestNameInputRef.current.style.borderBottom = `1px solid ${borderColor}`;
    }
  }, [contestName]);

  useEffect(() => {
    (async () => {
      try {
        const res = await adminContestList();
        setContests(res);
      } catch (err) {
        /**/
      }
    })();
  }, []);

  return (
    <>
      <MainHeader />
      <S.Layout>
        <S.Title>CONTEST CREATE</S.Title>
        <S.DeviceLine />
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
            <p ref={nameLengthRef}>글자 수 : {contestName.length} </p>
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
              value={questionInput}
              onChange={(e) => onQuestionInputChange(e)}
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
        <S.DeviceLine />
        <S.ContestLayout>
          {contests.map((contest, index) => {
            let authority = "";
            if (contest.authority === "FIRST_YEAR") authority = "1학년";
            if (contest.authority === "SECOND_YEAR") authority = "1학년";
            if (contest.authority === "THIRD_YEAR") authority = "1학년";
            if (contest.authority === "USER") authority = "모든 사용자";
            return (
              <S.HalfLayout index={index}>
                <S.ContestBox>
                  <ContestInfo label="대회명" value={contest.title} />
                  <ContestInfo
                    label="대회기간"
                    value={`${contest.startTime} ~ ${contest.endTime}`}
                  />
                  <ContestInfo
                    label="문제"
                    value={
                      contest.problemIds && contest.problemIds.length > 0
                        ? contest.problemIds.join(", ")
                        : "문제가 없습니다."
                    }
                  />
                  <ContestInfo label="참여권한" value={authority} />
                </S.ContestBox>
              </S.HalfLayout>
            );
          })}
        </S.ContestLayout>
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
