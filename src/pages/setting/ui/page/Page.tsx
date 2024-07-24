import { MainHeader } from "@/shared/components";
import React from "react";
import { customAxios } from "@/shared/utils/customAxios";
import * as S from "./style";

export const Setting = () => {
  const stolenName = localStorage.getItem("name")
  const onLogoutClick = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      await customAxios.delete("/auth", {
        data: { refreshToken },
      });
      localStorage.removeItem("name");
      localStorage.removeItem("color");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <MainHeader />
      {
        stolenName ? <S.Logout onClick={onLogoutClick}>로그아웃</S.Logout> : <p>로그인하세요</p>
      }
    </>
  );
};
