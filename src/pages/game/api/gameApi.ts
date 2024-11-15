import { customAxios } from "@/shared/utils/customAxios";

export const attackUser = async (roomId: string) =>
  (await customAxios.get(`/item/users/${roomId}`)).data;

interface itemSubmitRequest {
  roomId?: string;
  problemId: number;
  sourcecode: string;
  language: string;
}
export const itemSubmit = async (requestBody: itemSubmitRequest) =>
  (await customAxios.post("/room/submit", requestBody)).data;
