import { customAxios } from "@/shared/utils/customAxios";

export const gameDetail = async (id: number) => {
  customAxios.get(`/problem/${id}`);
};
