import * as S from "./style";
import Editor from "@monaco-editor/react";
import { Button } from "shared/components";

export const CodeEditor = () => {
  return (
    <>
      <S.EditorLayout>
        <S.HeaderBox>
          <S.FileName>Main.py</S.FileName>
          <S.ButtonBox>
            <S.Button>
              <Button mode="small" color="blue">
                Python
              </Button>
            </S.Button>
            <S.Button>
              <Button mode="small" color="blue">
                테스트케이스
              </Button>
            </S.Button>
            <S.Button>
              <Button mode="small" color="blue">
                실행
              </Button>
            </S.Button>
            <S.Button>
              <Button mode="small" color="green">
                제출
              </Button>
            </S.Button>
          </S.ButtonBox>
        </S.HeaderBox>
        <Editor
          theme="vs-dark"
          height="30rem"
          width="100%"
          defaultLanguage="javascript"
          defaultValue=""
          options={{
            fontSize: 16,
          }}
        />
        <S.TestBox>
          <S.TestHeader>
            <S.TestRun>실행</S.TestRun>
            <S.TestCase>테스트케이스</S.TestCase>
          </S.TestHeader>
        </S.TestBox>
        x
      </S.EditorLayout>
    </>
  );
};
