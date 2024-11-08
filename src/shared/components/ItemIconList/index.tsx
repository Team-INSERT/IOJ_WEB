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
}: {
  roomId: string | undefined;
  openModal: (item: string) => void;
}) => {
  const [isItemList, setItemList] = useState<Item[] | null>(null);

  useEffect(() => {
    if (!roomId) return;
    (async () => {
      try {
        const itemList = await getItemList(roomId);
        setItemList(itemList);
      } catch (error: any) {
        console.error("에러 발생:", error);
      }
    })();
  }, [roomId]);

  return (
    <S.Layout>
      {isItemList
        ? isItemList.map((item) => (
            <ItemIcon key={item.item} name={item.item} openModal={() => openModal(item.item)} />
          ))
        : ""}
    </S.Layout>
  );
};

export default ItemIconList;
