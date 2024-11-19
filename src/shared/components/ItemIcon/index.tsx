import { useState } from "react";
import * as S from "./style";

interface ItemProps {
  name: string;
  openModal: (item: string) => void;
  isWarningVisible: boolean;
}

const ItemIcon = ({ name, openModal, isWarningVisible }: ItemProps) => {
  const [isShaking, setIsShaking] = useState(false);

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
    if (sameItem) {
      if (sameItem.item === "SHIELD" && !isWarningVisible) {
        // Warning이 없을 때 흔들림 애니메이션
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500); // 0.5초 동안 애니메이션 유지
      } else {
        openModal(sameItem.item); // Warning이 있을 때만 모달 오픈
      }
    }
  };

  return (
    <div>
      {sameItem ? (
        <S.Layout
          onClick={handleLayoutClick}
          className={isShaking ? "shake" : ""}
        >
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
    </div>
  );
};

export default ItemIcon;
