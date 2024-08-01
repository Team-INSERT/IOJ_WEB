import { customAxios } from "@/shared/utils/customAxios";

export const contestProblemList = async () => (await customAxios.get(`/admin`)).data;
