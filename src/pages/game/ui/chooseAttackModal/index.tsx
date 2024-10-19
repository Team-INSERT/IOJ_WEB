import { useState } from "react";
import { UserCompartment } from "@/shared/components";
import * as S from "./style";

export const ChooseAttackModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const users = [
    { id: 1, username: "예", color: "skyblue" },
    { id: 2, username: "예예", color: "orange" },
    { id: 3, username: "예예예", color: "neon" },
    { id: 4, username: "예예예예", color: "purple" },
    { id: 5, username: "예예예예예", color: "red" },
    { id: 6, username: "예예예예예예", color: "pink" },
    { id: 7, username: "예이이", color: "blue" },
  ];

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <S.Overlay>
      <S.Layout>
        <S.Title>공격할 대상을 선택하세요!!</S.Title>
        <S.MemberContainer itemCount={users.length}>
          {users.map((detail) => (
            <S.UserConpartment key={detail.id}>
              <UserCompartment
                layoutWidth={140}
                UserName={detail.username}
                color={detail.color}
                width={95}
                smallFontSize
              />
            </S.UserConpartment>
          ))}
        </S.MemberContainer>
        <S.CancelBtn onClick={handleClose}>취소하기</S.CancelBtn>{" "}
      </S.Layout>
    </S.Overlay>
  );
};
