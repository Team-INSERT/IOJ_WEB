import { customAxios } from "@/shared/utils/customAxios";

export const contestList = async () =>
  (await customAxios.get(`/contest`)).data;

export const contestProblem = async (contestid: number) =>
  (await customAxios.get(`/contest/${contestid}`)).data;