import { customAxios } from "@/shared/utils/customAxios";
import { postBodyProps } from "../ui/main";

export const createContestApi = async (postBody: postBodyProps) => {
  await customAxios.post("/contest", postBody);
};
