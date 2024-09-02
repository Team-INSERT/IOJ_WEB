import { customAxios } from "@/shared/utils/customAxios";

type getTestcaseProps = {
  id: number;
  sourcecode: string;
  language: string;
};

export const getTestcase = async (testcaseInfo: getTestcaseProps) =>
  (await customAxios.post("/problem/submit/testcases", testcaseInfo)).data;
