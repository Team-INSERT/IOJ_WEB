import { customAxios, publicAxios } from "../customAxios";

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
    const response = await publicAxios.post(
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
      localStorage.setItem("access", newAccessToken);
      localStorage.setItem("refresh", refreshToken);
    }

    if (localStorage.getItem("access") && localStorage.getItem("refresh")) {
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
