import { customAxios } from "@/shared/utils/customAxios";

export const adminContestList = async () =>
  (await customAxios.get("/contest/admin")).data;
