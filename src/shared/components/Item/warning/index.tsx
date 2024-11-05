import React from "react";
import styled, { keyframes } from "styled-components";

const blinkAnimation = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const Layout = styled.div`
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  animation: ${blinkAnimation} 0.4s ease-in-out 0s 5;
  background: radial-gradient(
      81.38% 81.38% at 50% 50%,
      rgba(227, 52, 52, 0.00) 0%,
      rgba(227, 52, 52, 0.15) 100%);
  animation-fill-mode: forwards;
  pointer-events: none;
`;

const Warning = () => <Layout />;

export default Warning;
