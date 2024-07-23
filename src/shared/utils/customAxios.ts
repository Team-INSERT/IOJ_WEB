import axios, { AxiosInstance } from "axios";

export const customAxios: AxiosInstance = axios.create({
  baseURL: "http://182.218.148.184:8888",
});
export const publicAxios: AxiosInstance = axios.create({
  baseURL: "http://182.218.148.184:8888",
});

customAxios.interceptors.request.use((data) => {
  const token = localStorage.getItem("access");
  const config = data;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

customAxios.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status !== 401) {
      return Promise.reject(err);
    }
    try {
      const reFreshToken = localStorage.getItem("refresh");
      const { data } = await publicAxios.post("/auth/refresh", {
        reFreshToken,
      });
      localStorage.setItem("access", data.accessToken);
      const { config } = err;
      if (config.headers) {
        config.headers.Authorization = `Bearer ${data.accessToken}`;
      }
      return customAxios(config);
    } catch (refreshErr) {
      return Promise.reject(refreshErr);
    }
  },
);
