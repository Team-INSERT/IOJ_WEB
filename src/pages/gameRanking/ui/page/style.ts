import { flex } from "@/shared/style";
import styled from "styled-components";

export const Layout = styled.div`
  width: 100%;
  ${flex.HORIZONTAL}
`
export const Content = styled.div`
  ${flex.COLUMN_CENTER}
  gap: 3.75rem;
  padding-top: 6.25rem;
`
export const BlueBg = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`
export const GreyBg = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 607px;
`