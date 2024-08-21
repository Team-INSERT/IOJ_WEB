import styled from "styled-components";
import { GameHeader } from "@/shared/components";
import { flex } from "@/shared/style";
import { CodeEditor } from "./editor";
import { Problem } from "./problem";

export const GameLayout = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

export const GameBox = styled.div`
  ${flex.HORIZONTAL};
  width: 100%;
  height: calc(100vh - 76px);
  overflow: hidden;
`;

export const Game = () => (
  <GameLayout>
    <GameHeader />
    <GameBox>
      <Problem />
      <CodeEditor />
    </GameBox>
  </GameLayout>
);
