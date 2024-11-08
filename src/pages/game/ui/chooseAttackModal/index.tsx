import { useEffect, useState } from "react";
import { UserCompartment } from "@/shared/components";
import { attackUser } from "../../api/gameApi";
import * as S from "./style";

interface User {
  targetId: number;
  nickname: string;
  color: string;
}

interface ChooseAttackModalProps {
  roomId: string;
}

export const ChooseAttackModal = ({ roomId }: ChooseAttackModalProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchAttackUser = async () => {
      try {
        const fetchedUsers = await attackUser(roomId);
        setUsers(fetchedUsers);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAttackUser();
  }, [roomId]);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <S.Overlay>
      <S.Layout>
        <S.Title>공격할 대상을 선택하세요!!</S.Title>
        <S.MemberContainer itemCount={users.length}>
          {users.map((user) => (
            <S.UserConpartment key={user.targetId}>
              <UserCompartment
                layoutWidth={140}
                UserName={user.nickname}
                color={user.color}
                width={95}
                smallFontSize
              />
            </S.UserConpartment>
          ))}
        </S.MemberContainer>
        <S.CancelBtn onClick={handleClose}>취소하기</S.CancelBtn>
      </S.Layout>
    </S.Overlay>
  );
};
