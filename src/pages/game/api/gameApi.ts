import { customAxios } from "@/shared/utils/customAxios";

export const contestList = async () =>
  (await customAxios.get(`/contest?page=0&size=3`)).data;
