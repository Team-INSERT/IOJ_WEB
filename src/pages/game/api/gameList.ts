import { customAxios } from "@/shared/utils/customAxios";

export const gameList = async () => {
  try {
    const response = await customAxios.get(`/problem?page=0&size=`);
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
};
