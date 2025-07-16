import { customAxios } from "@/shared/utils/customAxios";

export const problem = async (id: number) =>
  (await customAxios.get(`/problem/${id}`)).data;

export interface UpdateProblemRequest {
  id: number;
  content: string;
  inputContent: string;
  outputContent: string;
}

export const updateProblem = async (requestData: UpdateProblemRequest) =>
  customAxios.patch(`/problem/update`, requestData);
