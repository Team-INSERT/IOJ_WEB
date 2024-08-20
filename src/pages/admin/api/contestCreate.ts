import { customAxios } from "@/shared/utils/customAxios";
import { postBodyProps } from "../ui/createC";

export const createContestApi = async (postBody: postBodyProps) => {
  await customAxios.post("/contest", postBody);
};
