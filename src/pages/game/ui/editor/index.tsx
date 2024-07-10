import * as S from "./style";
import Editor from "@monaco-editor/react";
import { GameHeader } from "../../../../shared/components";

export const CodeEditor = () => {
  return (
    <S.EditorLayout>
      <GameHeader />
      <Editor
        height="100em"
        defaultLanguage="c"
        defaultValue="코드를 입력하세요"
      />
      s
    </S.EditorLayout>
  );
};
