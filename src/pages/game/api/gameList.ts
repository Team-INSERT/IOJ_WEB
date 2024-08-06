import { customAxios } from "@/shared/utils/customAxios";

export const gameList = async () => {
  customAxios.get(`/problem?page=0&size=`);
};
