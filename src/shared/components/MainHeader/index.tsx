import { useLocation, useNavigate } from "react-router-dom";
import IojLogo from "@/assets/IojLogo";
import { useEffect, useState } from "react";
import * as S from "./style";

const MainHeader = () => {
  const MenusDetails = [
    { id: 1, name: "홈", navigate: "/" }, // navigate 경로들은 예시로 해놨습니다.
    { id: 2, name: "게임하기", navigate: "/game" },
    { id: 3, name: "랭킹", navigate: "/ranking" },
    { id: 4, name: "문제", navigate: "/question" },
    { id: 5, name: "게임소개", navigate: "/introduce" },
    { id: 6, name: "가이드", navigate: "/guide" },
  ];
  const stolenName = localStorage.getItem("name");

  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState("로그인");

  useEffect(() => {
    if (stolenName) {
      setUserName(stolenName);
    }
  }, []);

  const headerItemClick = (url: string) => {
    window.open(url, "_blank", "noopener, noreferrer");
  };

  const onNameClick = () => {
    if (stolenName) {
      navigate("/setting");
    } else {
      navigate("/login");
    }
  };

  return (
    <S.Layout>
      <S.Logo>
        <IojLogo onClick={() => navigate("/")} />
      </S.Logo>
      <S.Menus>
        {MenusDetails.map((item) => (
          <S.Menu
            key={item.id}
            isActive={location.pathname === item.navigate}
            onClick={() => headerItemClick(item.navigate)}
          >
            {item.name}
          </S.Menu>
        ))}
      </S.Menus>
      <S.Details>
        <S.DetailText onClick={onNameClick}>{userName}</S.DetailText>|
        <S.DetailText onClick={() => navigate("/setting")}>설정</S.DetailText>
      </S.Details>
    </S.Layout>
  );
};

export default MainHeader;
