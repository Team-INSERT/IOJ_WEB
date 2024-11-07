import { customAxios } from "@/shared/utils/customAxios";

export const attackUser = async (roomId: string) =>
  (await customAxios.get(`/item/users/${roomId}`)).data;
