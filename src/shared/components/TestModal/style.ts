import styled, { keyframes, css } from "styled-components";
import warning from "@/assets/warning.svg";
import correct from "@/assets/correct.svg";
import { flex, Pretendard, theme } from "@/shared/style";

const slideDown = keyframes`
  from {
    transform: translate(-50%, -100%);
    opacity: 0;
  }
  to {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
`;

export const ModalContainer = styled.div<{ animation?: boolean }>`
  margin-top: 20px;
  width: 440px;
  border-radius: 8px;
  border: 1px solid ${theme.grey200};
  background-color: ${theme.white};
  ${flex.COLUMN_FLEX}
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${(props) =>
    props.animation &&
    css`
      animation: ${slideDown} 0.5s ease-out;
      top: 10%;
    `}
`;

export const Detail = styled.div`
  ${flex.FLEX};
  align-items: center;
  padding: 24px 20px;
  gap: 12px;
`;

export const Image = styled.div<{ status: string }>`
  width: 41px;
  height: 41px;
  background-image: ${(props) =>
    props.status === "좋음" ? `url(${correct})` : `url(${warning})`};
  background-size: cover;
  background-position: center;
`;

export const Text = styled.div`
  ${flex.COLUMN_FLEX};
  justify-content: center;
  gap: 6px;
`;

export const Title = styled.span`
  ${Pretendard.Text}
  font-weight: bold;
  font-size: 18px;
  color: ${theme.black};
`;

export const SubTitle = styled.span`
  ${Pretendard.SmallText}
  color: ${theme.grey600};
  font-size: 14px;
`;

export const BtnContainer = styled.footer`
  display: flex;
  justify-content: flex-end;
  background-color: ${theme.grey100};
  padding: 8px 20px;
  gap: 8px;
  border-top: 1px solid ${theme.grey200};
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;
