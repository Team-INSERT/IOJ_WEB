import styled from "styled-components";
import { flex, NexonFont, theme } from "@/shared/style";

export const StandardLayout = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  ${flex.CENTER};
`;
export const ModalLayout = styled.div`
  width: 57.5rem;
  height: 36.5rem;
  background-color: ${theme.white};
  box-shadow:
    -368px 361px 144px 0 rgba(0, 0, 0, 0),
    -235px 231px 132px 0 rgba(0, 0, 0, 0.01),
    -132px 130px 111px 0 rgba(0, 0, 0, 0.04),
    -59px 58px 82px 0 rgba(0, 0, 0, 0.07),
    -15px 14px 45px 0 rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  ${flex.COLUMN_VERTICAL};
  position: relative;
  overflow: hidden;
`;
export const Standard = styled.p`
  margin-top: 20px;
  ${NexonFont.NexonSmallTitle};
  color: ${theme.grey900};
  margin-bottom: 20px;
  z-index: 2;
`;
export const ContentBox = styled.div`
  ${flex.CENTER};
  z-index: 2;
`;
export const Content = styled.div`
  width: 460px;
  height: 450px;
  ${flex.CENTER};
`;
export const CenterLine = styled.div`
  width: 1px;
  height: 420px;
  background-color: ${theme.grey300};
`;
export const Topics = styled.div`
  ${flex.COLUMN_CENTER};
  gap: 40px;
`;
export const Texts = styled.div`
  ${flex.COLUMN_CENTER};
  gap: 20px;
`;
export const TopicTitle = styled.p`
  ${NexonFont.NexonBigText};
  font-weight: 700;
  color: ${theme.grey900};
`;
export const TopicContent = styled.p`
  ${NexonFont.NexonText};
  font-weight: 300;
  color: ${theme.grey800};
`;
export const TopicContents = styled.div`
  ${flex.COLUMN_CENTER};
`;
export const BlueColor = styled.span`
  color: ${theme.insertBlue};
`;
export const RedColor = styled.span`
  color: ${theme.warningRed};
`;
export const Background = styled.div<{ isSecond?: boolean }>`
  width: 458px;
  height: 458px;
  border-radius: 458px;
  position: absolute;
  background: ${({ isSecond }) =>
    isSecond
      ? "radial-gradient(50% 50% at 50% 50%, #ff9f9f 0%, #fff 100%)"
      : "radial-gradient(50% 50% at 50% 50%, #9fceff 0%, #fff 100%)"};
  left: ${({ isSecond }) => (isSecond ? "auto" : "-28%")};
  right: ${({ isSecond }) => (isSecond ? "-28%" : "auto")};
  top: ${({ isSecond }) => (isSecond ? "42%" : "-4%")};
`;
export const ExitCircle = styled.img`
  position: absolute;
  right: 7px;
  top: 7px;
  cursor: pointer;
`;
