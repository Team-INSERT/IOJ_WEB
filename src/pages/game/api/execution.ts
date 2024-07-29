import { customAxios } from "@/shared/utils/customAxios";

interface ExecutionResponse {
  id: number;
  compileStatus: string;
  pass: boolean;
}

export const execution = async (
  id: number,
  sourcecode: string,
): Promise<ExecutionResponse> => {
  try {
    const response = await customAxios.post(
      `/problem/execution`,
      { id, sourcecode },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return { id, compileStatus: "Failed", pass: false };
  }
};
