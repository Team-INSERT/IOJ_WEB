import { customAxios } from "@/shared/utils/customAxios";

export const getItemList = async (roomId: number) =>
  (await customAxios.get(`/item/${roomId}`)).data;
