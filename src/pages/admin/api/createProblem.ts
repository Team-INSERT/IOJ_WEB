import { customAxios } from "@/shared/utils/customAxios";
import { RequestDataProps } from "@/pages/admin/ui/createQ";

export const postProblem = async (requestData: RequestDataProps) =>
  customAxios.post(`/problem`, requestData);
