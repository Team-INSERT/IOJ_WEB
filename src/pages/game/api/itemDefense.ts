import { customAxios } from "@/shared/utils/customAxios";

interface DefenseRequset {
  roomId: string;
  item: string;
  attackItemId: number;
}
export const itemDefense = async (requestBody: DefenseRequset) => {
  const response = await customAxios.post("/item/protect", requestBody);
  return response.data;
};
