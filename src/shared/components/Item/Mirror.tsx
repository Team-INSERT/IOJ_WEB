import { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";

const rotate180Animation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(180deg);
  }
`;

const rotateBackToOriginalAnimation = keyframes`
  from {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const RotatableContainer = styled.div<{
  rotationState: "none" | "first" | "second";
}>`
  perspective: 1000px;
  transition: transform 0.6s ease-in-out;
  width: 100%;
  height: 100%;

  ${({ rotationState }) =>
    rotationState === "first" &&
    css`
      animation: ${rotate180Animation} 0.6s forwards;
    `}

  ${({ rotationState }) =>
    rotationState === "second" &&
    css`
      animation: ${rotateBackToOriginalAnimation} 0.6s forwards;
    `}
`;
