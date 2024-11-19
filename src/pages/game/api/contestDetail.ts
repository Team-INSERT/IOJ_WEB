import { customAxios } from "@/shared/utils/customAxios";

export const contestProblems = async (contestid: number) =>
  (await customAxios.get(`/contest/${contestid}`)).data;
