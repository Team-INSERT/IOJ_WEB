import { ReactComponent as DevilModal } from "@/assets/devilModal.svg";
import { ReactComponent as DevilIcon } from "@/assets/devilIcon.svg";
import { useEffect, useState } from "react";
import * as S from "./style";
import ItemStatusText from "../../ItemStatusText";

const Devil = () => {
  const [textHidden, setTextHidden] = useState(false);
  const [hideText, setHideText] = useState(false);
  const [iconsHidden, setIconsHidden] = useState(false);
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

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
      clearTimeout(iconsTimer);
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
