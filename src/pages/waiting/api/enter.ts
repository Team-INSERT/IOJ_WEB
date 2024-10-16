import { customAxios } from "@/shared/utils/customAxios";

export const enter = async (roomid: number) =>
  (await customAxios.get(`/room/${roomid}/join`)).data;

export const leave = async (roomid: number) =>
  (await customAxios.get(`/room/${roomid}/leave`)).data;

export const ready = async (roomid: number) =>
  (await customAxios.get(`/room/${roomid}/ready`)).data;

export const start = async (roomid: number) =>
  (await customAxios.get(`/room/${roomid}/start`)).data;

export const deleteRoom = async (roomid: number) =>
  (await customAxios.get(`/room/${roomid}/delete`)).data;
