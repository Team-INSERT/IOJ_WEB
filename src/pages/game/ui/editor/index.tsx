import { useState } from "react";
import Editor from "@monaco-editor/react";
import Button from "@/shared/components/Button";
import Dropdown from "@/shared/components/DropDown";
import { TestBox } from "../testbox";
import { execution } from "../../api/execution";
import { contestSubmit } from "../../api/contestSubmt";
import * as S from "./style";

export const CodeEditor = () => {
  const [code, setCode] = useState<string>("");
  const [languages, setLanguage] = useState<string>("PYTHON");
  const [fileName, setFileName] = useState<string>("Main.py");

  const handleExecution = async () => {
    try {
      const response = await execution({ id: 1, sourcecode: code });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await contestSubmit({
        contestId: 1,
        problemId: 2,
        sourcecode: code,
        language: languages,
      });
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLanguageChange = (selectedLanguage: string, file: string) => {
    setLanguage(selectedLanguage.toUpperCase());
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
            <Button mode="small" color="blue" font="nexon">
              테스트케이스
            </Button>
          </S.Button>
          <S.Button onClick={handleExecution}>
            <Button mode="small" color="blue" font="nexon">
              실행
            </Button>
          </S.Button>
          <S.Button onClick={handleSubmit}>
            <Button mode="small" color="green" font="nexon">
              제출
            </Button>
          </S.Button>
        </S.ButtonBox>
      </S.HeaderBox>
      <Editor
        theme="vs-dark"
        height="18rem"
        width="100%"
        defaultLanguage={languages.toLowerCase()}
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
