import React, { useEffect } from "react";
import { MainHeader } from "@/shared/components";
import Google from "@/assets/Google";
import customAxios from "@/shared/utils/customAxios";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as S from "./style";

export const Login = () => {
  const navigate = useNavigate()
  let OAUTH_URL = "";
  useEffect(() => {
    (async () => {
      const { data } = await axios.get("http://182.218.148.184:8888/auth");
      console.log(data);
      OAUTH_URL = data;
    })();
  }, []);

  const locateOauth = () => {
    window.location.href = OAUTH_URL
  }

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
