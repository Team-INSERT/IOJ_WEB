import { customAxios } from "@/shared/utils/customAxios";

export const getAttackStart = async (attackItemId: number) =>
  (await customAxios.get(`/item/attack/start/${attackItemId}`)).data;
