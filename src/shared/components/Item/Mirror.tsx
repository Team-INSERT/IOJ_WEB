import { useEffect } from "react";
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
  onAnimationComplete?: () => void;
}>`
  perspective: 1000px;
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

const RotatableContainerWithAnimation = ({
  rotationState,
  onAnimationComplete,
  children,
}: {
  rotationState: "none" | "first" | "second";
  onAnimationComplete?: () => void;
  // eslint-disable-next-line no-undef
  children: React.ReactNode;
}) => {
  useEffect(() => {
    const handleAnimationEnd = () => {
      if (onAnimationComplete) {
        onAnimationComplete();
      }
    };

    const container = document.querySelector(".rotatable-container");
    container?.addEventListener("animationend", handleAnimationEnd);

    return () => {
      container?.removeEventListener("animationend", handleAnimationEnd);
    };
  }, [rotationState, onAnimationComplete]);

  return (
    <RotatableContainer
      className="rotatable-container"
      rotationState={rotationState}
    >
      {children}
    </RotatableContainer>
  );
};

export default RotatableContainerWithAnimation;
