import { customAxios } from "@/shared/utils/customAxios";

type getTestcaseProps = {
  id: number;
  sourcecode: string;
  language: string;
}

export const getTestcase = async (testcaseInfo: getTestcaseProps) => {
  const res = (await customAxios.post("/problem/submit/testcases", testcaseInfo)).data;
  return res;
};
