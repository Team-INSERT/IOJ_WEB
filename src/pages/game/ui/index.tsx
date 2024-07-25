import styled from "styled-components";
import { CodeEditor } from "./editor";
import { GameHeader } from "../../../shared/components";
import { Problem } from "./problem";
import { flex } from "../../../shared/style";

export const GameLayout = styled.div`
  width: 100%;
  height: 80%;
`;
export const GameBox = styled.div`
  ${flex.HORIZONTAL}
  width: 100%;
  height: 100%;
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
