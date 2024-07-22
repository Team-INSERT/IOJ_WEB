import React from "react";
import { MainHeader } from "@/shared/components";
import Google from "@/assets/Google";
import * as S from "./style";

export const Login = () => (
  <>
    <MainHeader />
    <S.Layout>
      <S.GoogleLayout>
        <Google />
        <S.Text>구글 로그인</S.Text>
      </S.GoogleLayout>
    </S.Layout>
  </>
);
