import axios, { AxiosInstance } from "axios";
import { getCookie, setCookie } from "./cookie/cookie";

export const customAxios: AxiosInstance = axios.create({
  baseURL: "http://182.218.148.184:8888",
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
      const refreshToken = getCookie("refreshToken");
      const { data } = await axios.post(
        "http://182.218.148.184:8888/auth/refresh",
        {
          refreshToken,
        },
      );
      setCookie("accessToken",data.access_token)
      const { config } = err;
      if (config.headers) {
        config.headers.Authorization = `Bearer ${data.accessToken}`;
      }
      return customAxios(config);
    } catch (refreshErr) {
      alert("토큰이 만료되거나 존재하지 않습니다! 다시 로그인 해주세요.")
      localStorage.clear()
      window.location.replace("/login")
      return Promise.reject(refreshErr);
    }
  },
);
