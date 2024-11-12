import { flex, Pretendard, theme } from "@/shared/style";
import styled from "styled-components";

export const ModalContainer = styled.div`
  width: 25%;
  background-color: ${theme.white};
  border-radius: 8px;
  padding: 24px 28px 26px 28px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
export const Header = styled.div`
  ${flex.FLEX}
  padding-bottom: 20px;
`;
export const Title = styled.div`
  ${Pretendard.Text}
  font-weight: bold !important;
`;
export const No = styled.div`
  margin-left: auto;
  cursor: pointer;
`;
export const InputContainer = styled.div`
  ${flex.COLUMN_FLEX}
  padding-bottom: 12px;
`;
export const InputContainerTitle = styled.div`
  ${Pretendard.Caption}
  padding-bottom: 4px;
`;
export const RoomTitleInput = styled.input`
  padding: 9px 12px;
  ${Pretendard.Caption}
  border-radius: 4px;
  outline: none;
  border: 1px solid ${theme.grey200};
`;
export const RoomMaximumNumberInput = styled.input`
  padding: 9px 8px;
  ${Pretendard.Caption}
  font-weight: 500 !important;
  border-radius: 4px;
  outline: none;
  border: 1px solid ${theme.grey200};
`;
export const RoomProblemInput = styled.input`
  padding: 9px 8px;
  ${Pretendard.Caption}
  font-weight: 500 !important;
  border-radius: 4px;
  outline: none;
  border: 1px solid ${theme.grey200};
`;
export const StarContainer = styled.div`
  ${flex.CENTER}
  margin-right: auto;
  ${Pretendard.SmallTitle}
`;
export const GameTimeInput = styled.input`
  padding: 9px 8px;
  ${Pretendard.Caption}
  font-weight: 500 !important;
  border-radius: 4px;
  outline: none;
  border: 1px solid ${theme.grey200};
`;
export const CreateButton = styled.button`
  margin-top: 8px;
  width: 100%;
  padding: 8px 0;
  border: none;
  ${Pretendard.SmallText}
  color: ${theme.white};
  background-color: ${theme.insertBlue};
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: ${theme.blueDark};
  }
`;
