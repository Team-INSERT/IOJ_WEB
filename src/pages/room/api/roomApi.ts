import { customAxios } from "@/shared/utils/customAxios";
import { createRoomProps } from "../ui/createRoomModal";

export const contestList = async () => (await customAxios.get(`/contest`)).data;

export const contestProblem = async (contestid: number) =>
  (await customAxios.get(`/contest/${contestid}`)).data;

export const gameRakingList = async (contestid: number) =>
  (await customAxios.get(`/contest/ranking/${contestid}`)).data;

export const roomList = async () => (await customAxios.get(`/room`)).data;

export const createRoomApi = async (createRoom: createRoomProps) => {
  const response = await customAxios.post("/room", createRoom);
  return response.data;
};
