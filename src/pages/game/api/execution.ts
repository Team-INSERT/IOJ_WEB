import { customAxios } from "@/shared/utils/customAxios";

interface ExecutionRequest {
  id: number;
  sourcecode: string;
}

export const execution = async (requestBody: ExecutionRequest) => {
  customAxios.post(`/problem/execution`, requestBody);
};
