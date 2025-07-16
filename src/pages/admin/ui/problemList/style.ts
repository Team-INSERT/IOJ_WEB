import { flex, theme } from "@/shared/style";
import styled from "styled-components";

export const Main = styled.div`
  min-height: 100vh;
  background-color: ${theme.white};
`;

export const Layout = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Header = styled.div`
  ${flex.BETWEEN}
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid ${theme.grey200};
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: ${theme.black};
`;

export const ListLayout = styled.div`
  background: ${theme.white};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const ListHeader = styled.div`
  ${flex.FLEX}
  background: ${theme.grey100};
  padding: 1rem;
  border-bottom: 1px solid ${theme.grey200};
  font-weight: bold;
  color: ${theme.black};
`;

export const ListContent = styled.div`
  max-height: 600px;
  overflow-y: auto;
`;

export const ProblemLayout = styled.div`
  ${flex.FLEX}
  padding: 1rem;
  border-bottom: 1px solid ${theme.grey200};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${theme.grey100};
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const ProblemData = styled.div`
  flex: 1;
  padding: 0 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Attribute = styled.div`
  flex: 1;
  padding: 0 0.5rem;
  text-align: center;
  font-weight: 600;
`;

export const ActionButton = styled.button`
  background: ${theme.blueNormal};
  color: ${theme.white};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s;

  &:hover {
    background: ${theme.blueDark};
  }
`; 