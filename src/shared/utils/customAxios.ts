import axios, { AxiosError, AxiosInstance } from "axios";
import { deleteCookie, getCookie, setCookie } from "./cookie/cookie";

export const customAxios: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

customAxios.interceptors.request.use((data) => {
  const token = getCookie("accessToken");
  const config = data;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const postRefreshToken = async () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const refreshToken = getCookie("refreshToken");
  const response = await axios.post(`${BASE_URL}/auth/refresh`, {
    refreshToken,
  });
  return response;
};
let isAlertShow = false;

customAxios.interceptors.response.use(
  (res) => res,
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    if (status === 401) {
      const originRequest = config;
      try {
        const response = await postRefreshToken();
        if (response.status === 201) {
          const newAccessToken = response.data.accessToken;
          setCookie("accessToken", newAccessToken);
          axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
          originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originRequest);
        }
      } catch (refreshError: unknown) {
        if (refreshError instanceof AxiosError) {
          if (refreshError.response?.status === 401) {
            deleteCookie("refreshToken");
            deleteCookie("accessToken");
            if (!isAlertShow) {
              isAlertShow = true;
              alert("로그인 시간이 만료되었습니다. 다시 로그인해주세요.");
              window.location.replace("/login");
            }
          }
        }
      }
    }
    return Promise.reject(error);
  },
);
