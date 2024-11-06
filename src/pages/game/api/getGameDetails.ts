import { customAxios } from "@/shared/utils/customAxios";

export const getGameDetails = async (roomId: string) =>
  (await customAxios.get(`/room/game/${roomId}`)).data;
