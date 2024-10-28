import { styled, keyframes } from "styled-components";

export const ModalWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const slideInAndOut = keyframes`
  0% {
    transform: translateX(-100%);
    opacity: 1;
  }
  40% {
    transform: translateX(0);
    opacity: 1;
  }
  60% {
    transform: translateX(70%);
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 1;
  }
`;

export const DevilModalContainer = styled.div`
  width: 100%;
  margin-top: 102px;
  animation: ${slideInAndOut} 4s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
  position: absolute;
  left: 35%;
  transform: translateX(-50%);
`;

const rotateLeftAnimation = keyframes`
  0% { transform: rotate(0deg); }
  50% { transform: rotate(-15deg); }
  100% { transform: rotate(0deg); }
`;

const rotateRightAnimation = keyframes`
  0% { transform: rotate(0deg); }
  50% { transform: rotate(15deg); }
  100% { transform: rotate(0deg); }
`;

export const LeftDevil = styled.div`
  position: absolute;
  left: 10%;
  top: 50%;
  transform: translateY(-50%);
  animation: ${rotateLeftAnimation} 1s ease-in-out infinite;
`;

export const RightDevil = styled.div`
  position: absolute;
  right: 10%;
  top: 50%;
  transform: translateY(-50%);
  animation: ${rotateRightAnimation} 1s ease-in-out infinite;
`;

export const NoShildText = styled.span`
  position: absolute;
  top: 30%;
  left: 81%;
`;
