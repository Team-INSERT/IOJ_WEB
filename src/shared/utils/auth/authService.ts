import { useEffect } from "react";
import axios from "axios";
import customAxios from "../customAxios";

export const useAuthService = () => {
  useEffect(() => {
    const { hash } = window.location;
    const params = new URLSearchParams(hash.substring(1));
    const accessToken = params.get("access_token");

    if (accessToken) {
      (async () => {
        try {
          const response = await axios.post(
            "http://182.218.148.184:8888/auth",
            {
              headers: {
                "Content-Type": "application/json",
              },
              accessToken,
            },
          );

          if (response.data.accessToken && response.data.refreshToken) {
            localStorage.setItem("access", response.data.accessToken);
            localStorage.setItem("refresh", response.data.refreshToken);
          }
          if (
            localStorage.getItem("access") &&
            localStorage.getItem("refresh")
          ) {
            const { data } = await customAxios.get("/user");
            localStorage.setItem("name", data.nickname);
            localStorage.setItem("color", data.color)
            window.location.replace("/");
          }
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, []);
};
