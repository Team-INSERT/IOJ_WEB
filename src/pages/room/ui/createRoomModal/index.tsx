import { Stars } from "@/shared/components";
import { ReactComponent as XBold } from "@/assets/XBold.svg";
import * as S from "./style";

interface CreateRoomModalProps {
  onClose: () => void; // onClose 함수의 타입을 () => void로 명시적으로 선언
}

export const CreateRoomModal = ({ onClose }: CreateRoomModalProps) => {
  const container = [
    {
      id: 1,
      title: "방 이름",
      detail: (
        <S.RoomTitleInput placeholder="방 이름을 입력하세요 (최대 20글자)" />
      ),
    },
    {
      id: 2,
      title: "최대 인원 수",
      detail: <S.RoomMaximumNumberInput type="number" placeholder="0" />,
    },
    {
      id: 3,
      title: "문제 수",
      detail: <S.RoomProblemInput type="number" placeholder="0" />,
    },
    {
      id: 4,
      title: "문제 난이도",
      detail: (
        <S.StarContainer>
          <Stars value={0} setting /> ~ <Stars value={0} setting />
        </S.StarContainer>
      ),
    },
    {
      id: 5,
      title: "게임 시간",
      detail: (
        <S.GameTimeInput
          type="number"
          placeholder="0"
          min="3"
          max="60"
          defaultValue="3"
        />
      ),
    },
  ];
  return (
    <S.Overlay>
      <S.ModalContainer>
        <S.Header>
          <S.Title>방 생성하기</S.Title>
          <S.No onClick={onClose}>
            <XBold />
          </S.No>
        </S.Header>
        {container.map((detail) => (
          <S.InputContainer key={detail.id}>
            <S.InputContainerTitle>{detail.title}</S.InputContainerTitle>
            {detail.detail}
          </S.InputContainer>
        ))}
        <S.CreateButton onClick={onClose}>생성하기</S.CreateButton>
      </S.ModalContainer>
    </S.Overlay>
  );
};
