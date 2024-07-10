import * as S from "./style";
import IojLogo from "../../../assets/IojLogo";
import { useNavigate } from "react-router-dom";

const MainHeader = () => {
  const MenusDetails = [
    { id: 1, name: "홈", navigate: "/footer" }, // navigate 경로들은 예시로 해놨습니다.
    { id: 2, name: "게임하기", navigate: "/footer" },
    { id: 3, name: "랭킹", navigate: "/footer" },
    { id: 4, name: "문제", navigate: "/footer" },
    { id: 5, name: "게임소개", navigate: "/footer" },
    { id: 6, name: "가이드", navigate: "/footer" },
  ];

  const navigate = useNavigate();

  return (
    <S.Layout>
      <S.Logo>
        <IojLogo />
      </S.Logo>
      <S.Menus>
        {MenusDetails.map((item) => (
          <S.Menu
            key={item.id}
            isHome={item.id === 1}
            onClick={() => navigate(item.navigate)}
          >
            {item.name}
          </S.Menu>
        ))}
      </S.Menus>
      <S.Details>
        <S.Login onClick={() => navigate("/login")}>로그인</S.Login>|<S.Setting>설정</S.Setting>
      </S.Details>
    </S.Layout>
  );
};

export default MainHeader;
