import { ReactComponent as DevilModal } from "@/assets/devilModal.svg";
import { ReactComponent as DevilIcon } from "@/assets/devilIcon.svg";
import { useEffect, useState } from "react";
import * as S from "./style";
import ItemStatusText from "../../ItemStatusText";

const Devil = () => {
  const [textHidden, setTextHidden] = useState<boolean>(false);
  const [hideText, setHideText] = useState<boolean>(false);
  const [iconsHidden, setIconsHidden] = useState<boolean>(false);
  // const [text, setText] = useState<string>("스페이스 백스페이스 테스트");

  useEffect(() => {
    const timer = setTimeout(() => {
      setHideText(true);
    }, 1000);

    const hideTimer = setTimeout(() => {
      setTextHidden(true);
    }, 3000);

    const iconsTimer = setTimeout(() => {
      setIconsHidden(true);
    }, 7000);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === " ") {
        event.preventDefault();
        // setText((prevText) => prevText.slice(0, -1));
      } else if (event.key === "Backspace") {
        event.preventDefault();
        // setText((prevText) => `${prevText} `);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
      clearTimeout(iconsTimer);
      window.removeEventListener("keydown", handleKeyDown); 
    };
  }, []);

  return (
    <S.ModalWrapper>
      <S.DevilModalContainer>
        <DevilModal />
      </S.DevilModalContainer>
      {!iconsHidden && (
        <>
          <S.LeftDevil>
            <DevilIcon />
          </S.LeftDevil>
          <S.RightDevil>
            <DevilIcon />
          </S.RightDevil>
        </>
      )}
      {!textHidden && (
        <S.NoShildText
          style={{
            transform: hideText ? "translateY(90px)" : "translateY(0)",
            transition: "transform 1s ease-in-out, opacity 1s ease-in-out",
            opacity: hideText ? 0 : 1,
          }}
        >
          <ItemStatusText status="방어 실패" title="대마왕" />
        </S.NoShildText>
      )}
    </S.ModalWrapper>
  );
};

export default Devil;
