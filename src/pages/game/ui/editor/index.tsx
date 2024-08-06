import { useState } from "react";
import Editor from "@monaco-editor/react";
import Button from "@/shared/components/Button";
import Dropdown from "@/shared/components/DropDown";
import { TestBox } from "../testbox";
import { execution } from "../../api/execution";
import * as S from "./style";

export const CodeEditor = () => {
  const [code, setCode] = useState<string>("");
  const [language, setLanguage] = useState<string>("python");
  const [fileName, setFileName] = useState<string>("Main.py");

  const handleSubmit = async () => {
    try {
      const response = await execution({ id: 1, sourcecode: code });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLanguageChange = (selectedLanguage: string, file: string) => {
    setLanguage(selectedLanguage);
    setFileName(file);
  };

  return (
    <S.EditorLayout>
      <S.HeaderBox>
        <S.FileName>{fileName}</S.FileName>
        <S.ButtonBox>
          <S.Button>
            <Dropdown onSelectLanguage={handleLanguageChange} />
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
        defaultLanguage={language}
        value={code}
        onChange={(value) => setCode(value || "")}
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
