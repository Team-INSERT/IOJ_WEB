import { customAxios } from "@/shared/utils/customAxios";

const requestData = {
  title: "a+b 출력하기",
  content: "a와 b를 입력받아 a+b를 더한 값을 출력하세요",
  level: 1,
  memoryLimit: 100,
  timeLimit: 1,
  testcases: [
    {
      input: "3\n4",
      output: "7",
    },
    {
      input: "8\n10",
      output: "18",
    },
    {
      input: "6\n9",
      output: "15",
    },
  ],
};

export const problem = async () => {
  try {
    const response = await customAxios.post(`/problem`, requestData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
};
