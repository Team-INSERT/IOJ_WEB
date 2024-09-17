import { customAxios } from "@/shared/utils/customAxios";

export const problem = async (id: number) =>
  (await customAxios.get(`/problem/${id}`)).data;
