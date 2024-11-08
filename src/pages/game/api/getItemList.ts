import { customAxios } from "@/shared/utils/customAxios";

export const getItemList = async (roomId: string) =>
  (await customAxios.get(`/item/${roomId}`)).data;
