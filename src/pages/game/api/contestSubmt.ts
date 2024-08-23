import { customAxios } from "@/shared/utils/customAxios";

interface SubmitRequest {
  contestId: number;
  problemId: number;
  sourcecode: string;
  language: string;
}

interface SubmitResponse {
  status: "ACCEPTED" | "WRONG_ANSWER";
  message: string;
}

export const contestSubmit = async (requestBody: SubmitRequest) => {
  const response = await customAxios.post<SubmitResponse>(
    "/contest/execution",
    requestBody,
  );
  return response.data;
};
