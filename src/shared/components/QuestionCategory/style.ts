import { NexonFont, flex, theme } from "@/shared/style";
import styled from "styled-components";

interface CategoryProps {
  color: string;
}

export const Layout = styled.div<CategoryProps>`
  height: 36px;
  width: 32px;
  background-color: ${({color}) => `${color}`};
  border-radius: 4px;
  ${flex.CENTER}
`
export const Text = styled.p`
  ${NexonFont.NexonText}
  color: ${theme.white};
`