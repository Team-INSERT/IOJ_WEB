import { useState } from "react";
import ErrorModal from "@/shared/components/ErrorModal";
import Modal from "@/shared/components/Modal";
import { useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import Button from "@/shared/components/Button";
import Dropdown from "@/shared/components/DropDown";
import { TestBox } from "../testbox";
import { execution } from "../../api/execution";
import { contestSubmit } from "../../api/contestSubmt";

import * as S from "./style";
import { getTestcase } from "../../api/testcase";

interface TestCase {
  index: number;
  input: number;
  output: string;
  expectOutput: string;
  verdict: string;
}

export const CodeEditor = () => {
  const navigate = useNavigate();

  const [code, setCode] = useState<string>("");
  const [languages, setLanguage] = useState<string>("PYTHON");
  const [fileName, setFileName] = useState<string>("Main.py");
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setErrorCode(null);
    navigate("/game/contest");
  };

  const [activeTab, setActiveTab] = useState<
    "execution" | "testCases" | "results"
  >("execution");
  const [isTestLoading, setIsTestLoading] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<TestCase[]>([]);

  const handleExecution = async () => {
    try {
      const response = await execution({ id: 1, sourcecode: code });
      console.log(response);
    } catch (err: any) {
      if (err.response) {
        setErrorCode(err.response.data.code);
      } else {
        setErrorCode("UNKNOWN");
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await contestSubmit({
        contestId: 2,
        problemId: 2,
        sourcecode: code,
        language: languages,
      });
      console.log(res);
    } catch (err: any) {
      if (err.response) {
        setErrorCode(err.response.data.code);
      } else {
        setErrorCode("UNKNOWN");
      }
    }
  };

  const handleLanguageChange = (selectedLanguage: string, file: string) => {
    setLanguage(selectedLanguage.toUpperCase());
    setFileName(file);
  };

  const onTestcaseClick = async () => {
    setActiveTab("testCases");
    try {
      setIsTestLoading(true);
      const res = await getTestcase({
        id: 1,
        sourcecode: code,
        language: languages,
      });
      setTestResult([...res]);
      setIsTestLoading(false);
      console.log(res);
    } catch (err) {
      setIsTestLoading(false);
      console.log(err);
    }
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
        <TestBox
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          testResult={testResult}
          isTestLoading={isTestLoading}
        />
      </S.TestBoxLayout>
      {errorCode && (
        <ErrorModal errorCode={errorCode} onClose={handleModalClose} />
      )}
      {isModalOpen && (
        <Modal
          status="나쁨"
          mode="알림"
          title="로그인이 필요한 서비스입니다."
          subtitle="게임하기는 로그인을 필요로 합니다!"
          onClose={handleModalClose}
          animation
        />
      )}
    </S.EditorLayout>
  );
};
