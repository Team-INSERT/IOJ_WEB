import styled, { css } from "styled-components";
import { NexonFont, Pretendard, theme } from "../style";

type ButtonMode = "big" | "exit" | "small" | "choose" | "warn";
type ColorMode = "gray" | "blue" | "glowBlue" | "red" | "glowRed" | "green";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  mode: ButtonMode;
  color: ColorMode;
}

const ButtonType = (mode: ButtonMode, color: ColorMode) => {
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
      default:
        return css``;
    }
  })();

  const modeStyles = (() => {
    switch (mode) {
      case "big":
        return css`
          padding: 12px 60px;
          font-weight: bold;
          ${Pretendard.Text}
        `;
      case "exit":
        return css`
          padding: 13px 61px;
          ${NexonFont.NexonText}
        `;
      case "small":
        return color === "green" || color === "gray" || color === "red"
          ? css`
              padding: 7px 16px;
              ${NexonFont.NexonSmallText}
            `
          : css`
              padding: 7px 16px;
              ${Pretendard.SmallText}
            `;
      case "choose":
        return css`
          padding: 6px 14px;
          ${Pretendard.SmallText}
        `;
      case "warn":
        return css`
          padding: 5px 10px;
          ${Pretendard.SmallText}
        `;
      default:
        return css``;
    }
  })();

  return css`
    ${colorStyles}
    ${modeStyles}
  `;
};

const StyledButton = styled.button<ButtonProps>`
  ${({ mode, color }) => ButtonType(mode, color)}
  border-radius: 4px;
  cursor: pointer;
`;

const Button = ({ mode, color, ...props }: ButtonProps) => {
  return <StyledButton mode={mode} color={color} {...props} />;
};

export default Button;
