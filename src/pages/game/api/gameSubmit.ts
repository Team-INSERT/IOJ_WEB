import { customAxios } from "@/shared/utils/customAxios";

interface SubmitRequest {
  id: number;
  sourcecode: string;
  language: string;
}

export const gameSubmit = async (requestBody: SubmitRequest) =>
  (await customAxios.post("/problem/submit", requestBody)).data;
