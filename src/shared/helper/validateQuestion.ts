export const validateQuestion = (
  ProblemTitle: string,
  explain: string,
  inputExplain: string,
  outputExplain: string,
  selectedLevel: number | null,
  problemMemoryLimit: string,
  problemTimeLimit: string,
  problemSource: string,
): {
  valid: boolean;
  status: "좋음" | "나쁨";
  title: string;
  subtitle: string;
} => {
  if (ProblemTitle.length === 0) {
    return {
      valid: false,
      status: "나쁨",
      title: "문제 제목을 입력해주세요.",
      subtitle: "문제 제목은 필수로 입력되어야 합니다!",
    };
  }

  if (ProblemTitle.length < 1 || ProblemTitle.length > 50) {
    return {
      valid: false,
      status: "나쁨",
      title: "문제 제목이 너무 짧거나 깁니다.",
      subtitle: "문제 제목은 5자 이상, 50자 이하여야 합니다!",
    };
  }

  if (explain.length === 0) {
    return {
      valid: false,
      status: "나쁨",
      title: "문제 설명을 입력해주세요.",
      subtitle: "문제 설명은 필수로 입력되어야 합니다!",
    };
  }

  if (inputExplain.length === 0) {
    return {
      valid: false,
      status: "나쁨",
      title: "입력 설명을 입력해주세요.",
      subtitle: "입력 설명은 필수로 입력되어야 합니다!",
    };
  }

  if (outputExplain.length === 0) {
    return {
      valid: false,
      status: "나쁨",
      title: "출력 설명을 입력해주세요.",
      subtitle: "출력 설명은 필수로 입력되어야 합니다!",
    };
  }

  if (problemSource.length === 0) {
    return {
      valid: false,
      status: "나쁨",
      title: "문제 출처를 입력해주세요.",
      subtitle: "문제 출처는 필수로 입력되어야 합니다!",
    }
  }
  if (selectedLevel === null || selectedLevel < 1 || selectedLevel > 5) {
    return {
      valid: false,
      status: "나쁨",
      title: "난이도를 확인해주세요.",
      subtitle: "난이도는 1에서 5 사이여야 하며, 반드시 선택되어야 합니다!",
    };
  }

  if (
    parseInt(problemMemoryLimit, 10) < 1 ||
    parseInt(problemMemoryLimit, 10) > 1024
  ) {
    return {
      valid: false,
      status: "나쁨",
      title: "메모리 제한을 확인해주세요.",
      subtitle: "메모리 제한은 1MB에서 1024MB 사이여야 합니다!",
    };
  }

  if (
    parseInt(problemTimeLimit, 10) < 1 ||
    parseInt(problemTimeLimit, 10) > 10
  ) {
    return {
      valid: false,
      status: "나쁨",
      title: "시간 제한을 확인해주세요.",
      subtitle: "시간 제한은 1초에서 10초 사이여야 합니다!",
    };
  }

  return { valid: true, status: "좋음", title: "", subtitle: "" };
};
