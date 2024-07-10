import React from 'react';
import * as S from './style'
import { MainHeader } from '@/shared/components';
import Google from '@/assets/Google';

export const Login = () => {
  return (
    <>
      <MainHeader />
      <S.Layout>
        <S.GoogleLayout>
          <Google />
          <S.Text>
            구글 로그인
          </S.Text>
        </S.GoogleLayout>
      </S.Layout>
    </>
  );
};