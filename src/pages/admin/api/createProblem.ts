import { customAxios } from "@/shared/utils/customAxios";
import { RequestDataProps } from "@/pages/admin/ui/createQ";

export const postProblem = async (requestData: RequestDataProps) =>
  customAxios.post(`/problem`, requestData);

export interface UpdateProblemRequest {
  id: number;
  content: string;
  inputContent: string;
  outputContent: string;
}

export const updateProblem = async (requestData: UpdateProblemRequest) =>
  customAxios.patch(`/problem/update`, requestData);
