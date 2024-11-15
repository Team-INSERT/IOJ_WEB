import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import DefeatMessage from "@/shared/components/DefeatMessage";

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

export const RotatableAnimation = ({
  rotationState,
  onAnimationComplete,
  children,
}: {
  rotationState: "none" | "first" | "second";
  onAnimationComplete?: () => void;
  children?: React.ReactNode; // children은 선택적 prop으로 설정
}) => {
  const [textVisible, setTextVisible] = useState(false);
  const [textTranslate, setTextTranslate] = useState(0);

  useEffect(() => {
    if (rotationState === "first" || rotationState === "second") {
      setTextVisible(true);
      setTextTranslate(-30);

      setTimeout(() => {
        setTextTranslate(40);

        setTimeout(() => {
          setTextVisible(false);
        }, 600);
      }, 800);
    }
  }, [rotationState]);

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
      <DefeatMessage
        status="방어 실패"
        title="미러미러"
        isVisible={textVisible}
        translateY={textTranslate}
      />
      {children}
    </RotatableContainer>
  );
};
