import { useLocation, useNavigate } from "react-router-dom";
import IojLogo from "@/assets/IojLogo";
import { useEffect, useState } from "react";
import { getCookie } from "@/shared/utils/cookie/cookie";
import * as S from "./style";
import Modal from "../Modal";

const MainHeader = () => {
  const MenusDetails = [
    { id: 1, name: "홈", navigate: "/" },
    { id: 2, name: "게임하기", navigate: "/game" },
    { id: 3, name: "대회", navigate: "/contest/list" },
    { id: 5, name: "아이템", navigate: "/game/find" },
    { id: 4, name: "문제", navigate: "/problem" },
  ];

  const navigate = useNavigate();
  const location = useLocation();

  const [isLogin, setIsLogin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");

  const headerItemClick = (url: string, id: number) => {
    const navIds = [2, 3, 5];
    if (navIds.includes(id)) {
      if (!isLogin) {
        setIsModalOpen(true);
        return;
      }
      navigate(url);
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

  const handleModalClose = (value: number) => {
    if (value === 0) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (accessToken && refreshToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  return (
    <>
      <S.Layout>
        <S.Logo>
          <IojLogo onClick={() => navigate("/")} />
        </S.Logo>
        <S.Menus>
          {MenusDetails.map((item) => (
            <S.Menu
              key={item.id}
              $isActive={location.pathname === item.navigate}
              onClick={() => headerItemClick(item.navigate, item.id)}
            >
              {item.name}
            </S.Menu>
          ))}
        </S.Menus>
        <S.Details>
          <S.DetailText onClick={onNameClick}>
            {accessToken && refreshToken
              ? getCookie("name")
              : "로그인"}
          </S.DetailText>
          |
          <S.DetailText onClick={() => navigate("/setting")}>설정</S.DetailText>
        </S.Details>
      </S.Layout>
      {isModalOpen && (
        <Modal
          status="나쁨"
          mode="알림"
          title="로그인이 필요한 서비스입니다."
          subtitle="게임하기는 로그인을 필요로 합니다!"
          onClose={handleModalClose}
          animation
        />
      )}
    </>
  );
};

export default MainHeader;
