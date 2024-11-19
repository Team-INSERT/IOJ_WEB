import * as S from "./style";

interface ItemStatusProps {
  status: string;
  title: string;
}

const ItemStatusText = ({ status, title }: ItemStatusProps) => {
  const itemDetail = [
    { id: 1, icon: "🐙", title: "문어먹물" },
    { id: 2, icon: "🪞", title: "미러미러" },
    { id: 3, icon: "😈", title: "대마왕" },
    { id: 4, icon: "💦", title: "물풍선" },
    { id: 5, icon: "🛡️", title: "쉴드" },
  ];

  const matchedItem = itemDetail.find((item) => item.title === title);

  return (
    <S.Layout>
      <S.Icon>{matchedItem ? matchedItem.icon : null}</S.Icon>
      <S.Text status={status}>{status}</S.Text>
    </S.Layout>
  );
};

export default ItemStatusText;