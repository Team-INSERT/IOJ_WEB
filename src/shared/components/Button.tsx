import React from "react";
import styled, { css } from "styled-components";
import { flex, NexonFont, Pretendard, theme } from "../style";

type ButtonMode = "big" | "exit" | "small" | "choose" | "warn";
type ColorMode =
  | "gray"
  | "blue"
  | "glowBlue"
  | "red"
  | "glowRed"
  | "green"
  | "white";

type FontType = "nexon" | "pretendard";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  mode: ButtonMode;
  color: ColorMode;
  font?: FontType;
}

const ButtonType = (mode: ButtonMode, color: ColorMode, font?: FontType) => {
  const colorStyles = (() => {
    switch (color) {
      case "blue":
        return css`
          background-color: ${theme.insertBlue};
          color: ${theme.white};
          border: none;
          &:hover {
            background-color: ${theme.blueNormalHover};
          }
        `;
      case "glowBlue":
        return css`
          background-color: transparent;
          color: ${theme.insertBlue};
          border: 1px solid ${theme.insertBlue};
          &:hover {
            background-color: ${theme.insertBlue};
            color: ${theme.white};
          }
        `;
      case "red":
        return css`
          background-color: ${theme.warningRed};
          color: ${theme.white};
          border: 1px solid ${theme.warningRed};
          &:hover {
            background-color: #d13030;
          }
        `;
      case "glowRed":
        return css`
          background-color: transparent;
          color: ${theme.warningRed};
          border: 1px solid ${theme.warningRed};
          &:hover {
            background-color: ${theme.warningRed};
            color: ${theme.white};
          }
        `;
      case "gray":
        return css`
          background-color: ${theme.grey700};
          color: ${theme.white};
          border: none;
          &:hover {
            background-color: #595959;
          }
        `;
      case "green":
        return css`
          background-color: ${theme.correctGreen};
          color: ${theme.white};
          border: none;
          &:hover {
            background-color: #22aa7a;
          }
        `;
      case "white":
        return css`
          background-color: ${theme.white};
          color: ${theme.grey900};
          border: 1px solid ${theme.grey200};
          &:hover {
            background-color: ${theme.grey100};
          }
        `;
      default:
        return css``;
    }
  })();

  const modeStyles = (() => {
    switch (mode) {
      case "big":
        return css`
          width: auto;
          padding: 12px 60px;
          font-weight: 700 !important;
          ${Pretendard.Text}
        `;
      case "exit":
        return css`
          padding: 13px 61px;
          ${NexonFont.NexonText}
        `;
      case "small":
        return font === "nexon"
          ? css`
              width: auto;
              padding: 0 16px;
              height: 32px;
              ${NexonFont.NexonSmallText}
              ${flex.CENTER};
            `
          : css`
              width: auto;
              padding: 0 16px;
              height: 32px;
              ${Pretendard.SmallText}
              ${flex.CENTER};
            `;
      case "choose":
        return css`
          width: auto;
          padding: 6px 14px;
          ${Pretendard.SmallText}
        `;
      case "warn":
        return css`
          width: auto;
          padding: 5px 10px;
          ${Pretendard.SmallText}
        `;
      default:
        return css``;
    }
  })();

  return css`
    white-space: nowrap;
    ${colorStyles}
    ${modeStyles}
  `;
};

const StyledButton = styled.button<ButtonProps>`
  ${({ mode, color, font }) => ButtonType(mode, color, font)}
  border-radius: 4px;
  cursor: pointer;
`;

const Button = ({ mode, color, font, ...props }: ButtonProps) => (
  <StyledButton mode={mode} color={color} font={font} {...props} />
);

export default Button;
