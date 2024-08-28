import { customAxios } from "@/shared/utils/customAxios";

interface SubmitRequest {
  contestId: number;
  problemId: number;
  sourcecode: string;
  language: string;
}

export const contestSubmit = async (requestBody: SubmitRequest) => {
  const response = await customAxios.post("/contest/execution", requestBody);
  return response.data;
};
