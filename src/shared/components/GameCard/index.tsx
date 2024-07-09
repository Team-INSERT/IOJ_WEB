import * as S from "./style";
import CustomLogo from "../../../assets/CustomLogo";
import ContestLogo from "../../../assets/ContestLogo";
import ContestMarkUp from "../../../assets/ContestMaskUp.png";
import CustomMarkUp from "../../../assets/CustomMaskUp.png";
import BasicMarkUp from "../../../assets/BasicMarkUp.png";
import CustomBackground from "../../../assets/CustomBackground.svg";
import ContestBackground from "../../../assets/ContestBackground.svg";
import BasicBackground from "../../../assets/BasicBackground.svg";

interface Modetype {
  mode: string;
}

const GameCard = ({ mode }: Modetype) => {
  const Details = [
    {
      id: 1,
      markup: BasicMarkUp,
      mode: "베이직 모드",
      subtitle1: "다양한 아이템으로",
      subtitle2: "여러가지 반전을 즐겨보세요!",
    },
    {
      id: 2,
      markup: ContestMarkUp,
      mode: "대회 모드",
      subtitle1: "많은 사람들과 대회를 해서",
      subtitle2: "랭킹을 높혀봐요!",
    },
    {
      id: 3,
      markup: CustomMarkUp,
      mode: "커스텀 모드",
      subtitle1: "자유롭게 게임을 만들어서",
      subtitle2: "다양한 경험을 할 수 있어요!",
    },
  ];

  const detail = Details.find((detail) => detail.mode === mode);

  if (!detail) {
    return <div>해당 모드를 찾을 수 없음.</div>;
  }

  let background;
  if (detail.id === 1) {
    background = BasicBackground;
  } else if (detail.id === 2) {
    background = ContestBackground;
  } else if (detail.id === 3) {
    background = CustomBackground;
  } else {
    background = "";
  }

  return (
    <S.Layout>
      <S.ImgContainer>
        <img src={detail.markup} alt={`${detail.mode} 이미지`} />
      </S.ImgContainer>
      <S.Details bgImage={background}>
        {mode === "대회 모드" && <ContestLogo />}
        {mode === "커스텀 모드" || mode === "베이직 모드" ? (
          <CustomLogo />
        ) : null}
        <S.Title>{detail.mode}</S.Title>
        <S.SubTitle>
          <S.Text>{detail.subtitle1}</S.Text>
          <S.Text>{detail.subtitle2}</S.Text>
        </S.SubTitle>
      </S.Details>
    </S.Layout>
  );
};

export default GameCard;
