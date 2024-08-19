import { useLocation, useNavigate } from "react-router-dom";
import IojLogo from "@/assets/IojLogo";
import { useEffect, useState } from "react";
import { checkLoginStatus } from "@/pages/main/api/checkLogin";
import * as S from "./style";

const MainHeader = () => {
  const MenusDetails = [
    { id: 1, name: "홈", navigate: "/" },
    { id: 2, name: "게임하기", navigate: "/game" },
    { id: 3, name: "랭킹", navigate: "/ranking" },
    { id: 4, name: "문제", navigate: "/question" },
    { id: 5, name: "게임소개", navigate: "/introduce" },
    { id: 6, name: "가이드", navigate: "/guide" },
  ];

  const navigate = useNavigate();
  const location = useLocation();

  const [isLogin, setIsLogin] = useState(false);

  const userName = localStorage.getItem("name")

  useEffect(() => {
    const verifyLogin = async () => {
      const loggedIn = await checkLoginStatus();
      setIsLogin(loggedIn);
    };

    verifyLogin();
  }, []);

  const headerItemClick = (url: string, id: number) => {
    if (id === 2) {
      if (!isLogin) {
        alert("로그인이 필요한 서비스입니다.");
        navigate("/login");
        return;
      }
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      navigate(url);
    }
  };

  const onNameClick = () => {
    if (isLogin) {
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
            onClick={() => headerItemClick(item.navigate, item.id)}
          >
            {item.name}
          </S.Menu>
        ))}
      </S.Menus>
      <S.Details>
        <S.DetailText onClick={onNameClick}>{userName || "로그인"}</S.DetailText>|
        <S.DetailText onClick={() => navigate("/setting")}>설정</S.DetailText>
      </S.Details>
    </S.Layout>
  );
};

export default MainHeader;
