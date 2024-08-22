import { useState } from "react";
import Editor from "@monaco-editor/react";
import Modal from "@/shared/components/Modal";
import Button from "@/shared/components/Button";
import Dropdown from "@/shared/components/DropDown";
import { TestBox } from "../testbox";
import { execution } from "../../api/execution";
import { contestSubmit } from "../../api/contestSubmt";
import * as S from "./style";
import { getTestcase } from "../../api/testcase";
import { TestCaseType } from "../../interfaces/gameInterfaces";

export const CodeEditor = () => {
  const { pathname } = window.location;
  const segments = pathname.split("/");
  const problemNum = parseInt(segments[segments.length - 1], 10);
  const [code, setCode] = useState<string>("");
  const [languages, setLanguage] = useState<string>("PYTHON");
  const [fileName, setFileName] = useState<string>("Main.py");
  const [activeTab, setActiveTab] = useState<
    "execution" | "testCases" | "results"
  >("execution");
  const [isTestLoading, setIsTestLoading] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<TestCaseType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleExecution = async () => {
    try {
      const response = await execution({ id: problemNum, sourcecode: code });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await contestSubmit({
        contestId: 1,
        problemId: problemNum,
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

  const onTestcaseClick = async () => {
    if (isTestLoading) {
      setIsModalOpen(true);
      return;
    }

    setActiveTab("testCases");
    setIsTestLoading(true);
    try {
      const res = await getTestcase({
        id: problemNum,
        sourcecode: code,
        language: languages,
      });
      setTestResult([...res]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTestLoading(false);
    }
  };

  const handleModalClose = (value: number) => {
    if (value === 0) {
      setIsModalOpen(false);
    }
  };

  return (
    <S.EditorLayout>
      {isModalOpen && (
        <Modal
          status="나쁨"
          mode="알림"
          title="이미 요청중입니다!"
          animation
          onClose={handleModalClose}
        />
      )}
      <S.HeaderBox>
        <S.FileName>{fileName}</S.FileName>
        <S.ButtonBox>
          <S.Button>
            <Dropdown onSelectLanguage={handleLanguageChange} />
          </S.Button>
          <S.Button>
            <Button mode="small" color="blue" onClick={onTestcaseClick}>
              테스트케이스
            </Button>
          </S.Button>
          <S.Button onClick={handleExecution}>
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
        defaultLanguage={languages.toLowerCase()}
        value={code}
        onChange={(value) => setCode(value || "")}
        options={{
          fontSize: 16,
        }}
      />
      <S.TestBoxLayout>
        <TestBox
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          testResult={testResult}
          isTestLoading={isTestLoading}
        />
      </S.TestBoxLayout>
    </S.EditorLayout>
  );
};
