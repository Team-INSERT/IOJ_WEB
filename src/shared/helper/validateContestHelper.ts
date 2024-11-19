export const validateContest = (
  contestName: string,
  startDateTime: string,
  endDateTime: string,
  todayDateTime: Date,
  questions: number[],
  joinAuthority: string,
):{ valid: boolean; status: "좋음" | "나쁨"; title: string; subtitle: string } => {
  if (contestName.length === 0) {
    return {
      valid: false,
      status: "나쁨",
      title: "대회명을 입력해주세요.",
      subtitle: "대회명은 필수로 입력되어야 합니다!",
    };
  }
  if (contestName.length < 2 || contestName.length > 22) {
    return {
      valid: false,
      status: "나쁨",
      title: "대회명을 입력해주세요.",
      subtitle: "대회명은 2자 이상 22자 이하여야합니다!",
    };
  }

  if (startDateTime.length !== 16 || endDateTime.length !== 16) {
    return {
      valid: false,
      status: "나쁨",
      title: "날짜와 시간을 입력해주세요.",
      subtitle: "날짜와 시간은 모두 입력되어야 합니다!",
    };
  }
  if (new Date(startDateTime) <= todayDateTime) {
    return {
      valid: false,
      status: "나쁨",
      title: "날짜와 시간을 입력해주세요.",
      subtitle: "시작 날짜와 시간은 현재 시각 이후여야 합니다.",
    };
  }
  if (endDateTime <= startDateTime) {
    return {
      valid: false,
      status: "나쁨",
      title: "날짜와 시간을 입력해주세요.",
      subtitle: "끝나는 날짜와 시간이 시작 날짜와 같거나 이전일 수 없습니다!",
    };
  }

  if (questions.length === 0) {
    return {
      valid: false,
      status: "나쁨",
      title: "문제를 입력해주세요.",
      subtitle: "문제는 한 가지 이상 추가되어야 합니다!",
    };
  }

  if (joinAuthority === "") {
    return {
      valid: false,
      status: "나쁨",
      title: "참가 권한을 선택해주세요.",
      subtitle: "참가 권한은 필수로 지정되어야 합니다!",
    };
  }

  return { valid: true, status: "좋음", title: "", subtitle: "" };
};
