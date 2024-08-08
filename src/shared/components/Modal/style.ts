import styled from "styled-components";
import warning from "@/assets/warning.svg";
import correct from "@/assets/correct.svg";
import { flex, Pretendard, theme } from "@/shared/style";

export const ModalContainer = styled.div`
  width: 440px;
  height: 170px;
  border-radius: 8px;
  border: 1px solid ${theme.grey200};
  background-color: ${theme.white};
  ${flex.COLUMN_FLEX}
`;

export const Detail = styled.div`
  ${flex.FLEX}
  padding: 24px 20px;
  gap: 12px;
`;

export const Image = styled.div<{ status: string }>`
  width: 41px;
  height: 41px;
  background-image: ${(props) =>
    props.status === "좋음" ? `url(${correct})` : `url(${warning})`};
`;

export const Text = styled.div`
  ${flex.COLUMN_FLEX}
  gap: 6px;
`;

export const Title = styled.span`
  ${Pretendard.Text}
  font-weight: bold;
`;

export const SubTitle = styled.span`
  ${Pretendard.SmallText}
  color: ${theme.grey600};
`;

export const BtnContainer = styled.footer`
  display: flex;
  justify-content: flex-end;
  background-color: #f9f9f9;
  padding: 8px 19px;
  ${flex.FLEX}
  gap: 8px;
  margin-top: auto;
`;
