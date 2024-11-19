import { getCookie, setCookie } from "../cookie/cookie";
import { customAxios } from "../customAxios";

export const fetchUserData = async () => {
  try {
    const { data } = await customAxios.get("/user");
    return data;
  } catch (error) {
    return error;
  }
};

export const authorizeAccess = async (accessToken: String) => {
  try {
    const response = await customAxios.post(
      "/auth",
      {
        accessToken,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const { accessToken: newAccessToken, refreshToken } = response.data;

    if (newAccessToken && refreshToken) {
      setCookie("accessToken", newAccessToken, {path: "/",});
      setCookie("refreshToken", refreshToken, { path: "/" });
    }

    if (getCookie("accessToken") && getCookie("refreshToken")) {
      const userData = await fetchUserData();
      localStorage.setItem("name", userData.nickname);
      localStorage.setItem("color", userData.color);
      window.location.replace("/");
    }

    return true;
  } catch (error) {
    return error;
  }
};
