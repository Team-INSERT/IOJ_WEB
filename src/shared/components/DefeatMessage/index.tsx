import React from "react";
import styled from "styled-components";
import ItemStatusText from "../ItemStatusText";

const MessageContainer = styled.div<{ isVisible: boolean; translateY: number }>`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%) ${({ translateY }) => `translateY(${translateY}px)`};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: transform 0.6s ease, opacity 0.6s ease;
`;

interface DefeatMessageProps {
  status: string;
  title: string;
  isVisible: boolean;
  translateY: number;
}

const DefeatMessage: React.FC<DefeatMessageProps> = ({ status, title, isVisible, translateY }) => (
  <MessageContainer isVisible={isVisible} translateY={translateY}>
    <ItemStatusText status={status} title={title} />
  </MessageContainer>
);

export default DefeatMessage;
