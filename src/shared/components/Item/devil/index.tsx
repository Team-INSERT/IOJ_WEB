import { ReactComponent as DevilModal } from "@/assets/devilModal.svg";
import { ReactComponent as DevilIcon } from "@/assets/devilIcon.svg";
import { useEffect, useState } from "react";
import * as S from "./style";
import ItemStatusText from "../../ItemStatusText";

const Devil = () => {
  const [textHidden, setTextHidden] = useState<boolean>(false);
  const [hideText, setHideText] = useState<boolean>(false);
  const [iconsHidden, setIconsHidden] = useState<boolean>(false);

  const handleKeyDown = (event: KeyboardEvent) => {
    const activeElement = document.activeElement as
      | HTMLInputElement
      | HTMLTextAreaElement
      | null;

    if (
      activeElement &&
      (activeElement.tagName === "INPUT" ||
        activeElement.tagName === "TEXTAREA")
    ) {
      const { selectionStart, selectionEnd, value } = activeElement;

      if (event.key === " ") {
        event.preventDefault();
        if (
          selectionStart !== null &&
          selectionEnd !== null &&
          selectionStart > 0
        ) {
          activeElement.value =
            value.slice(0, selectionStart - 1) + value.slice(selectionEnd);
          activeElement.setSelectionRange(
            selectionStart - 1,
            selectionStart - 1,
          );
        }
      } else if (event.key === "Backspace") {
        event.preventDefault();
        if (selectionStart !== null && selectionEnd !== null) {
          activeElement.value = `${value.slice(0, selectionStart)} ${value.slice(selectionEnd)}`;
          activeElement.setSelectionRange(
            selectionStart + 1,
            selectionStart + 1,
          );
        }
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setHideText(true), 1000);
    const hideTimer = setTimeout(() => setTextHidden(true), 3000);
    const iconsTimer = setTimeout(() => {
      setIconsHidden(true);
      window.removeEventListener("keydown", handleKeyDown);
    }, 7000);

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
