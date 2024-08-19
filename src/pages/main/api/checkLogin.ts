import { customAxios } from "@/shared/utils/customAxios";

export const checkLoginStatus = async () => {
  const token = localStorage.getItem("access");

  if (!token) {
    return false;
  }

  try {
    const res = await customAxios.get("/user");
    return res.status === 200;
  } catch (error) {
    return false;
  }
};