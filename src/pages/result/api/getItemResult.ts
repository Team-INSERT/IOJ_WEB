import { customAxios } from "@/shared/utils/customAxios";

export const getItemResult = async (roomId: string) =>
  (await customAxios.get(`/room/result/${roomId}`)).data;
