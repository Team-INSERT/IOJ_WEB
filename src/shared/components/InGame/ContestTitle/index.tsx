import * as S from "./style";

interface Details {
  title: string;
  date: string;
}

const ContestTitle = ({ title, date }: Details) => (
  <S.BackgroundLayout>
    <S.Layout>
      <S.Title>{title}</S.Title>
      <S.Date>{date}</S.Date>
    </S.Layout>
  </S.BackgroundLayout>
);

export default ContestTitle;
