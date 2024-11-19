import { customAxios } from "@/shared/utils/customAxios";

export const boilerplateCode = async (language: string) =>
  (await customAxios.get(`/code/${language}`)).data;
