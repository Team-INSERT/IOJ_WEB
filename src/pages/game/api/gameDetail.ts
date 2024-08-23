import { customAxios } from "@/shared/utils/customAxios";

export const gameDetail = async (id: number) =>
  (await customAxios.get(`/problem/${id}`)).data;
