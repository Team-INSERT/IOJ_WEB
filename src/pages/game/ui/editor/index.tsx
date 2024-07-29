import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import Button from "@/shared/components/Button";
import Dropdown from "@/shared/components/DropDown";
import { TestBox } from "../testbox";
import { execution } from "../../api/execution";
import * as S from "./style";

export const CodeEditor = () => {
  const [code, setCode] = useState<string>("");

  const handleSubmit = async () => {
    try {
      const response = await execution(1, code);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <S.EditorLayout>
      <S.HeaderBox>
        <S.FileName>Main.py</S.FileName>
        <S.ButtonBox>
          <S.Button>
            <Dropdown />
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
          <S.Button onClick={handleSubmit}>
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
        defaultLanguage="python"
        value={code}
        options={{
          fontSize: 16,
        }}
      />
      <S.TestBoxLayout>
        <TestBox />
      </S.TestBoxLayout>
    </S.EditorLayout>
  );
};
