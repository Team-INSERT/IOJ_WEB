import React from "react";
import * as S from "./style";
import ItemIcon from "../ItemIcon";

const ItemIconList = () => {
  const a = 1;
  return (
    <S.Layout>
      <ItemIcon name="MIRROR" />
      <ItemIcon name="INK" />
      <ItemIcon name="DEVIL" />
      <ItemIcon name="BUBBLE" />
      <ItemIcon name="SHIELD" />
    </S.Layout>
  );
};

export default ItemIconList;
