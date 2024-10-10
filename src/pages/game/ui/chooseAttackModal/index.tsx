import { useState } from "react";
import { UserCompartment, WaitingRoom } from "@/shared/components";
import * as S from "./style";

export const ChooseAttackModal = () => {
  const [set, setlsf] = useState("");
  return (
    <S.Overlay>
      <S.Layout>
        <S.Title>공격할 대상을 선택하세요!!</S.Title>
        <S.MemberContainer>
          {Array.from({ length: 7 }).map(() => (
            <S.UserConpartment>
              <UserCompartment UserName="Dsf" width={100} color="red" />
            </S.UserConpartment>
          ))}
        </S.MemberContainer>
        <S.CancelBtn>취소하기</S.CancelBtn>
      </S.Layout>
    </S.Overlay>
  );
};
