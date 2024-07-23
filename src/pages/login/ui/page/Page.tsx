import React, { useEffect } from "react";
import { MainHeader } from "@/shared/components";
import Google from "@/assets/Google";
import { publicAxios } from "@/shared/utils/customAxios";
import * as S from "./style";

export const Login = () => {
  let OAUTH_URL = "";
  useEffect(() => {
    (async () => {
      const { data } = await publicAxios.get("/auth");
      OAUTH_URL = data;
    })();
  }, []);

  const locateOauth = () => {
    window.location.href = OAUTH_URL;
  };

  return (
    <>
      <MainHeader />
      <S.Layout>
        <S.GoogleLayout onClick={locateOauth}>
          <Google />
          <S.Text>구글 로그인</S.Text>
        </S.GoogleLayout>
      </S.Layout>
    </>
  );
};
