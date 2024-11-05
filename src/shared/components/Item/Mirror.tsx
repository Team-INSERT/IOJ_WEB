import { useState } from "react";
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

export const Mirror = () => {
  const [rotationState, setRotationState] = useState<
    "none" | "first" | "second"
  >("none");

  const triggerRotation = () => {
    if (rotationState === "none") {
      setRotationState("first");
      setTimeout(() => {
        setRotationState("second");
        setTimeout(() => {
          setRotationState("none");
        }, 600);
      }, 5000);
    }
  };

  return { rotationState, triggerRotation };
};

export const RotatableContainer = styled.div<{
  rotationState: "none" | "first" | "second";
}>`
  perspective: 1000px;
  transition: transform 0.6s ease-in-out;

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

// 밑 코드와 같이 사용하면 됌

// import React from "react";
// import { Mirror, RotatableContainer } from "@/shared/components/Item/mirror"; // 경로 조정 필요
// import styled from "styled-components";

// const Content = styled.div`
//   text-align: center;
//   margin-bottom: 20px;
// `;

// const RotateButton = styled.button`
//   padding: 10px 20px;
//   font-size: 16px;
//   cursor: pointer;
// `;

// const Shield: React.FC = () => {
//   const { rotationState, triggerRotation } = Mirror();

//   return (
//     <RotatableContainer rotationState={rotationState}>
//       <Content>
//         <h1>Shield Component</h1>
//         <p>버튼을 클릭하면 180도 회전 후 다시 원래 모습으로 돌아옵니다.</p>
//         <RotateButton onClick={triggerRotation}>Shield 회전</RotateButton>
//       </Content>
//     </RotatableContainer>
//   );
// };

// export default Shield;
