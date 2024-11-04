import { flex, NexonFont, theme } from "@/shared/style";
import styled from "styled-components";

export const Layout = styled.div`
  position: relative;
  width: fit-content;
  display: flex;
`;

export const MainLayout = styled.div<{ name: string }>`
  ${flex.COLUMN_CENTER}
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${theme.white};
  width: 65px;
  border: 2px solid transparent;
  background-image: linear-gradient(white, white),
    linear-gradient(180deg, ${({ name }) => (name === "쉴드" ? "#ADFFCE" : "#fff2af")} , ${({ name }) => (name === "쉴드" ? "#007CFF" : "#ff48ab")});
  background-origin: border-box;
  background-clip: padding-box, border-box;
  position: relative;

  &:hover .description {
    visibility: visible;
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Logo = styled.div`
  font-size: 30px;
`;

export const Name = styled.span`
  ${NexonFont.NexonCaption}
`;

export const Description = styled.div`
  ${flex.COLUMN_CENTER}
  font-weight: "Pretendard-Regular";
  font-size: 10px;
  width: fit-content;
  padding: 10px 16px;
  border-radius: 20px 20px 0 20px;
  background-color: #3c3c3c;
  color: ${theme.white};
  visibility: hidden;
  opacity: 0;
  transform: translateX(20px);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease,
    visibility 0.3s ease;
  z-index: 100;
  position: absolute;
  right: 115%;
  white-space: nowrap;

  ${MainLayout}:hover & {
    visibility: visible;
    opacity: 1;
    transform: translateX(0);
  }
`;