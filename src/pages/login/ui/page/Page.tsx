import React, { useEffect } from "react";
import { MainHeader } from "@/shared/components";
import Google from "@/assets/Google";
import { customAxios } from "@/shared/utils/customAxios";
import * as S from "./style";
import { authUrl } from "../../api/getAuthUrl";

export const Login = () => {
  let OAUTH_URL = "";
  useEffect(() => {
    const getAuthUrl = async () => {
      try {
        const res = await authUrl();
        OAUTH_URL = res;
      } catch (err) {
        console.log(err);
      }
    };
    getAuthUrl()
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
