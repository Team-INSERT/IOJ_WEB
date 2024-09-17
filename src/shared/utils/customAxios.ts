import axios, { AxiosInstance } from "axios";
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

customAxios.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status !== 401) {
      return Promise.reject(err);
    }
    try {
      deleteCookie("accessToken");
      const BASE_URL = process.env.REACT_APP_BASE_URL;
      const refreshToken = getCookie("refreshToken");
      const { data } = await axios.post(`${BASE_URL}/auth/refresh`, {
        refreshToken,
      });
      setCookie("accessToken", data.accessToken);
      window.location.reload();
      return undefined;
    } catch (refreshErr) {
      alert("토큰이 만료되거나 존재하지 않습니다! 다시 로그인 해주세요.");
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      localStorage.clear();
      window.location.replace("/login");
      return Promise.reject(refreshErr);
    }
  },
);
