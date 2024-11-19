import { customAxios } from "@/shared/utils/customAxios";

export const problemList = async () =>
  (await customAxios.get("/problem")).data;
