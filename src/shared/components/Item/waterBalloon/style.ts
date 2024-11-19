import { flex, NexonFont, theme } from "@/shared/style";
import styled, { keyframes } from "styled-components";

const squish = keyframes`
  0%, 100% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.1, 0.9);
  }
`;

const boomAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(4);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
`;

export const AnimatedBalloon = styled.div`
  animation: ${squish} 1.5s ease-in-out infinite;
`;

export const Layout = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  ${flex.CENTER}
  background: radial-gradient(
      circle,
      transparent,
      transparent 100%,
      rgba(0, 124, 255, 0.15) 0%
    ),
    linear-gradient(
      to right,
      rgba(0, 124, 255, 0.3),
      transparent 10%,
      transparent 70%,
      rgba(0, 124, 255, 0.3)
    ),
    linear-gradient(
      to left,
      rgba(0, 124, 255, 0.3),
      transparent 10%,
      transparent 70%,
      rgba(0, 124, 255, 0.3)
    ),
    linear-gradient(
      to bottom,
      rgba(0, 124, 255, 0.3),
      transparent 10%,
      transparent 80%,
      rgba(0, 124, 255, 0.3)
    ),
    linear-gradient(
      to top,
      rgba(0, 124, 255, 0.3),
      transparent 10%,
      transparent 80%,
      rgba(0, 124, 255, 0.3)
    );
  background-blend-mode: screen;
`;

export const Bar = styled.div`
  position: absolute;
  left: 7%;
  display: flex;
  flex-direction: column;
  width: 80px;
  padding: 5px 5px 0 5px;
  background-color: white;
`;

export const BoomImage = styled.img`
  position: absolute;
  top: 10%;
  left: 15%;
  width: 1300px;
  animation: ${boomAnimation} 2s forwards;
`;

export const White = styled.div`
  background-color: white;
  height: 25px;
  margin-bottom: 5px;
`;

export const Red = styled.div`
  background-color: ${theme.warningRed};
  height: 25px;
  margin-bottom: 5px;
`;

export const Orange = styled.div`
  background-color: ${theme.ORANGE};
  height: 25px;
  margin-bottom: 5px;
`;

export const Yellow = styled.div`
  background-color: #fbe62b;
  height: 25px;
  margin-bottom: 5px;
`;

interface SpaceProps {
  isPressed: boolean;
}

export const Space = styled.div<SpaceProps>`
  position: absolute;
  width: fit-content;
  padding: 12px 134px;
  background-color: ${({ isPressed }) =>
    isPressed ? theme.insertBlue : "white"};
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border: ${({ isPressed }) => (isPressed ? "none" : "2px solid #ccc")};
  ${NexonFont.NexonTitle}
  color: ${({ isPressed }) => (isPressed ? "white" : "black")};
  bottom: 15%;
`;
export const Cursor = styled.img`
  position: absolute;
  bottom: 11%;
  left: 59%;
`;

export const NoShieldText = styled.div`
  position: absolute;
  top: 30%;
  left: 81%;
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
  z-index: 1;
`;
