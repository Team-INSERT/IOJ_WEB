import styled from "styled-components";
import { flex, theme } from "../../../shared/style";
import { CodeEditor } from "./editor";

export const Game = () => {
  return (
    <>
      <CodeEditor />
    </>
  );
};

export const GameLayout = styled.div`
  width: 100%;
  height: 100%;
`;
