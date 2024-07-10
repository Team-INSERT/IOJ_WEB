import styled from "styled-components";
import { CodeEditor } from "./editor";
import { GameHeader } from "../../../shared/components";
import { Problem } from "./problem";
import { Pretendard, theme, flex } from "../../../shared/style";

export const Game = () => {
  return (
    <>
      <GameHeader />
      <GameLayout>
        <Problem />
        <CodeEditor />
      </GameLayout>
    </>
  );
};

export const GameLayout = styled.div`
  ${flex.HORIZONTAL}
  width: 100%;
  height: 100%;
`;
