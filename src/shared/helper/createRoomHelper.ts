export const validateCreateRoom = (
  title: string,
  maxPeople: number,
  problem: number,
  minDifficulty: number,
  maxDifficulty: number,
  time: number,
): {
  valid: boolean;
  status: "좋음" | "나쁨";
  title: string;
  subtitle: string;
} => {
  if (title.length === 0) {
    return {
      valid: false,
      status: "나쁨",
      title: "제목을 입력해주세요.",
      subtitle: "방 제목은 필수로 입력되어야 합니다!",
    };
  }
  if (maxPeople < 2 || maxPeople > 8) {
    return {
      valid: false,
      status: "나쁨",
      title: "인원을 선택해주세요.",
      subtitle: "인원은 2명 이상 8명 이하여야 합니다!",
    };
  }

  if (problem < 1) {
    return {
      valid: false,
      status: "나쁨",
      title: "문제 개수를 선택해주세요.",
      subtitle: "문제는 1개 이상이여야 합니다!",
    };
  }
  if (minDifficulty === 0 || maxDifficulty === 0) {
    return {
      valid: false,
      status: "나쁨",
      title: "문제 난이도를 입력해주세요.",
      subtitle: "문제 난이도는 필수로 선택되어야 합니다!",
    };
  }
  if (time < 1 || time > 60) {
    return {
      valid: false,
      status: "나쁨",
      title: "진행 시간을 입력해주세요.",
      subtitle: "진행 시간은 1분 이상 60분 이하여야 합니다!",
    };
  }
  return { valid: true, status: "좋음", title: "", subtitle: "" };
};
