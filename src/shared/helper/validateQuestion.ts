export const validateQuestion = (
  ProblemTitle: string,
  explain: string,
  inputExplain: string,
  outputExplain: string,
  selectedLevel: number | null,
  problemMemoryLimit: string,
  problemTimeLimit: string,
  problemSource: string,
  subtasks?: Array<{
    score: number;
    description: string;
    testcases: Array<{
      input: string;
      output: string;
      example: boolean;
    }>;
  }>,
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
    parseInt(problemMemoryLimit, 10) < 1024 ||
    parseInt(problemMemoryLimit, 10) > 512000
  ) {
    return {
      valid: false,
      status: "나쁨",
      title: "메모리 제한을 확인해주세요.",
      subtitle: "메모리 제한은 1024KB에서 512000KB 사이여야 합니다!",
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

  // subtask 검증 추가
  if (subtasks && subtasks.length > 0) {
    for (let i = 0; i < subtasks.length; i += 1) {
      const subtask = subtasks[i];
      
      // subtask 점수 검증
      if (subtask.score <= 0) {
        return {
          valid: false,
          status: "나쁨",
          title: `서브태스크 ${i + 1}의 점수를 입력해주세요.`,
          subtitle: "서브태스크 점수는 0보다 커야 합니다!",
        };
      }

      // subtask 설명 검증
      if (subtask.description.length === 0) {
        return {
          valid: false,
          status: "나쁨",
          title: `서브태스크 ${i + 1}의 설명을 입력해주세요.`,
          subtitle: "서브태스크 설명은 필수로 입력되어야 합니다!",
        };
      }

      // subtask 테스트케이스 검증
      if (subtask.testcases.length === 0) {
        return {
          valid: false,
          status: "나쁨",
          title: `서브태스크 ${i + 1}의 테스트케이스를 입력해주세요.`,
          subtitle: "서브태스크는 최소 1개의 테스트케이스가 필요합니다!",
        };
      }

      for (let j = 0; j < subtask.testcases.length; j += 1) {
        const testcase = subtask.testcases[j];
        
        if (testcase.input.length === 0) {
          return {
            valid: false,
            status: "나쁨",
            title: `서브태스크 ${i + 1}의 테스트케이스 ${j + 1} 입력을 입력해주세요.`,
            subtitle: "테스트케이스 입력은 필수로 입력되어야 합니다!",
          };
        }

        if (testcase.output.length === 0) {
          return {
            valid: false,
            status: "나쁨",
            title: `서브태스크 ${i + 1}의 테스트케이스 ${j + 1} 출력을 입력해주세요.`,
            subtitle: "테스트케이스 출력은 필수로 입력되어야 합니다!",
          };
        }
      }
    }
  }

  return { valid: true, status: "좋음", title: "", subtitle: "" };
};
