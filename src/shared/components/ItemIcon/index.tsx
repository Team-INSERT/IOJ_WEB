import React, { useState } from "react";
import { ChooseAttackModal } from "@/pages/game/ui/chooseAttackModal";
import { roomIdAtom } from "@/shared/utils/atom/roomAtom";
import { useAtom } from "jotai";
import * as S from "./style";

interface ItemProps {
  name: string;
}

const ItemIcon = ({ name }: ItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomId] = useAtom(roomIdAtom);
  const itemDetail = [
    {
      logo: "🪞",
      itemName: "미러미러",
      item: "MIRROR",
      description1: "상대방의 화면을",
      description2: "180도 뒤집습니다.",
    },
    {
      logo: "🐙",
      itemName: "문어먹물",
      item: "INK",
      description1: "상대방의 화면에",
      description2: "먹물을 뿌립니다.",
    },
    {
      logo: "😈",
      itemName: "대마왕",
      item: "DEVIL",
      description1: "백스페이스와 스페이스바의",
      description2: "위치를 바꿉니다.",
    },
    {
      logo: "💦",
      itemName: "물풍선",
      item: "BUBBLE",
      description1: "상대방에게 아주 큰 물풍선을",
      description2: "던집니다.",
    },
    {
      logo: "🛡️",
      itemName: "쉴드",
      item: "SHIELD",
      description1: "어떤 아이템이든 막을 수 있는",
      description2: "보호막을 전개합니다.",
    },
  ];

  const sameItem = itemDetail.find((detail) => detail.item === name);

  const handleLayoutClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {sameItem ? (
        <S.Layout onClick={handleLayoutClick}>
          <S.MainLayout name={sameItem.itemName}>
            <S.Description className="description">
              <p>{sameItem.description1}</p>
              <p>{sameItem.description2}</p>
            </S.Description>
            <S.Logo>{sameItem.logo}</S.Logo>
            <S.Name>{sameItem.itemName}</S.Name>
          </S.MainLayout>
        </S.Layout>
      ) : null}
      {isModalOpen && (
        <ChooseAttackModal roomId={roomId} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default ItemIcon;
