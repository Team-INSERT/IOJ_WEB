import { MainHeader } from "@/shared/components";
import React from "react";
import { customAxios } from "@/shared/utils/customAxios";
import * as S from "./style";

export const Setting = () => {
  const onLogoutClick = async () => {
    const refreshToken = localStorage.getItem("refresh");
    try {
      await customAxios.delete("/auth", {
        data: { refreshToken },
      });
      localStorage.removeItem("name");
      localStorage.removeItem("color");
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <MainHeader />
      <S.Logout onClick={onLogoutClick}>로그아웃</S.Logout>
    </>
  );
};
