import { Button, ContestTitle } from "@/shared/components";
import * as S from "./style";

const ContestList = () => (
  <S.Layout>
    <S.TitleContainer>
      <S.Title>대회목록</S.Title>
      <S.Button>
        <Button mode="small" color="red">
          뒤로가기
        </Button>
      </S.Button>
    </S.TitleContainer>
    <S.ContestList>
      <ContestTitle
        title="2024학년도 1학년 알고리즘 대회"
        date="09/17 13:30 ~ 09/17 14:30"
      />
      <ContestTitle
        title="2024학년도 2학년 알고리즘 대회"
        date="09/17 13:30 ~ 09/17 14:30"
      />
      <ContestTitle
        title="2024학년도 3학년 알고리즘 대회"
        date="09/17 13:30 ~ 09/17 14:30"
      />
    </S.ContestList>
  </S.Layout>
);

export default ContestList;
