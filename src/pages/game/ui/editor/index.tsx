import * as S from "./style";
import Editor from "@monaco-editor/react";
import { Button } from "shared/components";

export const CodeEditor = () => {
  return (
    <>
      <S.EditorLayout>
        <S.ButtonBox></S.ButtonBox>
        <Editor
          theme="vs-dark"
          height="50em"
          width="100%"
          defaultLanguage="javascript"
          defaultValue="코드를 입력하세요"
        />
      </S.EditorLayout>
    </>
  );
};
