import styled from "styled-components";
import chooseAttackBackground from "@/assets/chooseAttackBackground.svg";
import { flex, NexonFont, theme } from "@/shared/style";

export const Overlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.27);
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

export const MemberContainer = styled.div<{ itemCount: number }>`
  ${flex.CENTER}
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px 90px;
  /* & > div {
    flex: 1 1 calc(25% - 50px);
    max-width: calc(25% - 20px);
  } */
`;

export const UserConpartment = styled.div`
  ${flex.CENTER};
  width: fit-content;
  height: fit-content;
`;

export const CancelBtn = styled.button`
  background-color: ${theme.white};
  margin-top: 10px;
  padding: 13px 47.5px;
  border: 1px solid ${theme.warningRed};
  color: ${theme.warningRed};
  ${NexonFont.NexonText}
  cursor: pointer;
  &:hover {
  }
`;
