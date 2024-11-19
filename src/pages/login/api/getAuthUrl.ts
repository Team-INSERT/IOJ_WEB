import { customAxios } from "@/shared/utils/customAxios";

export const authUrl = async () => (await customAxios.get("/auth")).data;
