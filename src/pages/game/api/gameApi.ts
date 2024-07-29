import { customAxios } from "@/shared/utils/customAxios";

export const contestList = async () =>
  (await customAxios.get(`/contest?page=0&size=3`)).data;

export const contestProblem = async (contestid: number) =>
  (await customAxios.get(`/contest/${contestid}`)).data;
