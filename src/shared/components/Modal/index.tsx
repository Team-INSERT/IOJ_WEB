import * as S from "./style";
import Button from "../Button";

interface ModalProps {
  status: "좋음" | "나쁨";
  mode: "알림" | "질문";
  title: string;
  subtitle?: string;
  animation?: boolean;
  overlay?: boolean;
  onClose: (value: number) => void;
}

const Modal = ({
  status,
  mode,
  title,
  subtitle,
  animation,
  onClose,
  overlay,
}: ModalProps) => {
  const renderFooterButtons = () => {
    if (status === "좋음") {
      return (
        <Button mode="choose" color="green" onClick={() => onClose(0)}>
          닫기
        </Button>
      );
    }
    if (status === "나쁨" && mode === "질문") {
      return (
        <>
          <Button mode="choose" color="white" onClick={() => onClose(2)}>
            아니요
          </Button>
          <Button mode="choose" color="red" onClick={() => onClose(1)}>
            예
          </Button>
        </>
      );
    }
    if (status === "나쁨") {
      return (
        <Button mode="choose" color="red" onClick={() => onClose(0)}>
          닫기
        </Button>
      );
    }
    return null;
  };

  return (
    <S.Overlay overlay={overlay}>
      <S.ModalContainer animation={animation ?? false}>
        <S.Detail>
          <S.Image status={status} />
          <S.Text>
            <S.Title>{title}</S.Title>
            {subtitle && <S.SubTitle>{subtitle}</S.SubTitle>}
          </S.Text>
        </S.Detail>
        <S.BtnContainer>{renderFooterButtons()}</S.BtnContainer>
      </S.ModalContainer>
    </S.Overlay>
  );
};

export default Modal;
