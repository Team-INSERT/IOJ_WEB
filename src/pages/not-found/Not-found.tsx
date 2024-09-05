import * as S from "./style";

export const NotFound = () => (
  <S.ErrorBox>
    <S.ErrorCode>404</S.ErrorCode>
    <S.ErrorText>페이지를 찾을 수 없습니다</S.ErrorText>
  </S.ErrorBox>
);
