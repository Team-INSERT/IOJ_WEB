import { ReactComponent as DevilModal } from "@/assets/devilModal.svg";
import { ReactComponent as DevilIcon } from "@/assets/devilIcon.svg";
import { useEffect, useState } from "react";
import * as S from "./style";
import ItemStatusText from "../../ItemStatusText";

const Devil = ({
  onAnimationComplete,
}: {
  onAnimationComplete: () => void;
}) => {
  const [textHidden, setTextHidden] = useState<boolean>(false);
  const [hideText, setHideText] = useState<boolean>(false);
  const [iconsHidden, setIconsHidden] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setHideText(true), 1000);
    const hideTimer = setTimeout(() => setTextHidden(true), 3000);
    const iconsTimer = setTimeout(() => {
      setIconsHidden(true);
      onAnimationComplete();
    }, 7000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
      clearTimeout(iconsTimer);
    };
  }, [onAnimationComplete]);

  return (
    <S.ModalWrapper>
      {!iconsHidden && (
        <>
          <S.DevilModalContainer>
            <DevilModal />
          </S.DevilModalContainer>
          <S.LeftDevil>
            <DevilIcon />
          </S.LeftDevil>
          <S.RightDevil>
            <DevilIcon />
          </S.RightDevil>
        </>
      )}
      {!textHidden && (
        <S.NoShildText hidden={hideText}>
          <ItemStatusText status="방어 실패" title="대마왕" />
        </S.NoShildText>
      )}
    </S.ModalWrapper>
  );
};

export default Devil;
