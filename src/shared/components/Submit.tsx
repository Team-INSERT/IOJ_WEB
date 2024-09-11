import React from "react";
import styled, { css } from "styled-components";
import { ReactComponent as CorrectModal } from "@/assets/CorrectModal.svg";
import { ReactComponent as InCorrectModal } from "@/assets/Submit.svg";
import { NexonFont } from "../style";

type SubmitMode = "Correct" | "RunTime" | "InCorrect";

interface SubmitProps extends React.HTMLAttributes<HTMLDivElement> {
  mode: SubmitMode;
}

const modeStyles = (mode: SubmitMode) => {
  switch (mode) {
    case "Correct":
      return css``;
    case "RunTime":
      return css``;
    case "InCorrect":
      return css``;
    default:
      return css``;
  }
};

const SubmitDiv = styled.div<SubmitProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 1rem;
  top: 9rem;
  z-index: 100;
  ${({ mode }) => modeStyles(mode)}
`;

const TextOverlay = styled.div`
  position: absolute;
  color: white;
  ${NexonFont.NexonSmallText}
`;

const SubmitType: React.FC<SubmitProps> = ({ mode, ...props }) => (
  <SubmitDiv mode={mode} {...props}>
    {mode === "Correct" && (
      <>
        <CorrectModal />
        <TextOverlay>정답입니다!</TextOverlay>
      </>
    )}
    {mode === "RunTime" && (
      <>
        <InCorrectModal />
        <TextOverlay>런타임 에러</TextOverlay>
      </>
    )}
    {mode === "InCorrect" && (
      <>
        <InCorrectModal />
        <TextOverlay>오답입니다.</TextOverlay>
      </>
    )}
  </SubmitDiv>
);

export default SubmitType;
