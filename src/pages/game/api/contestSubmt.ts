import { customAxios } from "@/shared/utils/customAxios";

interface SubmitRequest {
  contestId: number;
  problemId: number;
  sourcecode: string;
  language: string;
}

export const contestSubmit = async (requestBody: SubmitRequest) => {
  await customAxios.post("/contest/execution", requestBody);
};
