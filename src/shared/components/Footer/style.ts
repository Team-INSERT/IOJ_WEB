import styled from "styled-components";
import { flex,theme } from "@/shared/style";

export const Layout = styled.div`
  padding: 53px 195px 37px 194px;
  background-color: ${theme.grey900};
  ${flex.COLUMN_FLEX};
`;
export const Logos = styled.div`
  ${flex.FLEX};
`;
export const GoGithub = styled.a`
  margin-left: auto;
`;
export const Names = styled.div`
  padding: 20px 0;
  font-size: 14px;
  color: ${theme.white};
`;
export const LineContainer = styled.div`
  padding-right: 1000px;
`;
export const Line = styled.div`
  border: 0.5px solid ${theme.grey500};
`;
export const Details = styled.div`
  padding-top: 62px;
  color: ${theme.grey500};
  font-size: 0.75rem;
`;
