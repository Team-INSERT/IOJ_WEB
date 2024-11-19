import { useEffect, useState } from "react";
import { UserCompartment } from "@/shared/components";
import { attackUser } from "../../api/gameApi";
import { getItemAttack } from "../../api/itemAttack";
import * as S from "./style";

interface User {
  targetId: number;
  nickname: string;
  color: string;
}

interface ChooseAttackModalProps {
  roomId: string;
  closeModal: () => void;
  item: string;
  refreshItemList: () => void;
}

interface itemAttackProps {
  roomId: string;
  targetUserId: number;
  attackItem: string;
}

export const ChooseAttackModal = ({
  roomId,
  closeModal,
  item,
  refreshItemList
}: ChooseAttackModalProps) => {
  const [isOpen] = useState(true);
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

  const onClickItemAttack = async (userId: number) => {
    const itemAttackData: itemAttackProps = {
      roomId,
      targetUserId: userId,
      attackItem: item,
    };
    try {
      await getItemAttack(itemAttackData);
      refreshItemList()
      closeModal();
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;
  return (
    <S.Overlay>
      <S.Layout>
        <S.Title>공격할 대상을 선택하세요!!</S.Title>
        <S.MemberContainer itemCount={users.length}>
          {users.map((user) => (
            <S.UserConpartment
              key={user.targetId}
              onClick={() => onClickItemAttack(user.targetId)}
            >
              <UserCompartment
                layoutWidth={150}
                UserName={user.nickname}
                color={user.color}
                width={100}
                smallFontSize
              />
            </S.UserConpartment>
          ))}
        </S.MemberContainer>
        <S.CancelBtn onClick={closeModal}>취소하기</S.CancelBtn>
      </S.Layout>
    </S.Overlay>
  );
};
