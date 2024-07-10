import styled from "styled-components";
import { flex, theme } from "@/shared/style";

export const Game = () => {
  return (
    <>
      <GameLayout></GameLayout>
    </>
  );
};

export const GameLayout = styled.div`
  ${flex};
  width: 100%;
  height: 100%;
`;
