import * as S from "./style";
import Editor from "@monaco-editor/react";

export const CodeEditor = () => {
  return (
    <S.EditorLayout>
      <Editor height="100%" />
    </S.EditorLayout>
  );
};
