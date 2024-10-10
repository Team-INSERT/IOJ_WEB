import styled from "styled-components";
import chooseAttackBackground from "@/assets/chooseAttackBackground.svg";
import { flex, NexonFont, theme } from "@/shared/style";

export const Overlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: "rgba(0, 0, 0, 0.27)";
  ${flex.CENTER}
`;
export const Layout = styled.div`
  background-image: url(${chooseAttackBackground});
  width: 853px;
  height: 533px;
  ${flex.COLUMN_CENTER}
  padding: 32px 0 42px 0;
`;
export const Title = styled.span`
  ${NexonFont.NexonSmallTitle}
`;
export const MemberContainer = styled.div`
  padding-top: 32px;
`;
export const UserConpartment = styled.div`
  width: 50%;
  height: 50%;
`;
export const CancelBtn = styled.button`
  padding: 13px 47.5px;
  border: 1px solid ${theme.warningRed};
  color: ${theme.warningRed};
  ${NexonFont.NexonText}
`;
