import { getItemList } from "@/pages/game/api/getItemList";
import { useEffect, useState } from "react";
import * as S from "./style";
import ItemIcon from "../ItemIcon";

interface Item {
  item: string;
}
const ItemIconList = (roomId: string) => {
  const [isItemList, setItemList] = useState<Item[] | null>(null);

  useEffect(() => {
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
        ? isItemList.map((item) => <ItemIcon name={item.item} />)
        : ""}
    </S.Layout>
  );
};

export default ItemIconList;
