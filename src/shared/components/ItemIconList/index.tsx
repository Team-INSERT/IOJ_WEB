import { getItemList } from "@/pages/game/api/getItemList";
import { useEffect, useState } from "react";
import * as S from "./style";
import ItemIcon from "../ItemIcon";

interface Item {
  item: string;
}

const ItemIconList = ({
  roomId,
  openModal,
  isWarningVisible, // 추가
}: {
  roomId: string | undefined;
  openModal: (item: string) => void;
  isWarningVisible: boolean; // 추가
}) => {
  const [isItemList, setItemList] = useState<Item[] | null>(null);

  const refreshItemList = async () => {
    if (!roomId) return;
    try {
      const itemList = await getItemList(roomId);
      setItemList(itemList);
    } catch (error: any) {
      console.error("에러 발생:", error);
    }
  };

  useEffect(() => {
    refreshItemList();
  }, [roomId]);

  return (
    <S.Layout>
      {isItemList
        ? isItemList.map((item) => (
            <ItemIcon
              isWarningVisible={isWarningVisible} // 추가
              key={item.item}
              name={item.item}
              openModal={() => openModal(item.item)}
            />
          ))
        : ""}
    </S.Layout>
  );
};

export default ItemIconList;
