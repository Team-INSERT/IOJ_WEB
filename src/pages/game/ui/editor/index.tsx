import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ErrorModal from "@/shared/components/ErrorModal";
import Modal from "@/shared/components/Modal";
import Button from "@/shared/components/Button";
import Dropdown from "@/shared/components/DropDown";
import AceEditor from "react-ace";
import { TestBox } from "../testbox";
import { execution } from "../../api/execution";
import { contestSubmit } from "../../api/contestSubmt";
import { getTestcase } from "../../api/testcase";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

import * as S from "./style";

interface TestCase {
  index: number;
  input: number;
  output: string;
  expectOutput: string;
  verdict: string;
}

export const CodeEditor = () => {
  const navigate = useNavigate();
  const { contestId, problemId } = useParams<{
    contestId: string;
    problemId: string;
  }>();

  const [code, setCode] = useState<string>("");
  const [language, setLanguage] = useState<string>("python");
  const [fileName, setFileName] = useState<string>("Main.py");
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "execution" | "testCases" | "results"
  >("execution");
  const [isTestLoading, setIsTestLoading] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<TestCase[]>([]);
  const [submissionResults, setSubmissionResults] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const boilerplateCode: { [key: string]: string } = {
    python: ``,
    cpp: `function solution() {\n    // Your code here\n}`,
    java: `public class Main {\n    public static void main(String[] args) {\n        // Your code here\n    }\n}`,
    c: `#include <stdio.h>\n\nint main() {\n    \n    return 0;\n}`,
  };

  useEffect(() => {
    if (problemId) {
      const savedCode = localStorage.getItem(`code_${problemId}`);
      const savedLanguage = localStorage.getItem(`language_${problemId}`);

      if (savedCode) {
        setCode(savedCode);
      } else {
        setCode(boilerplateCode[language]);
      }
      if (savedLanguage) {
        setLanguage(savedLanguage);
      }
    }
  }, [problemId]);

  useEffect(() => {
    const getCode = localStorage.getItem(`code_${problemId}`);
    if (getCode) {
      // 로컬스토리지의 코드가 보일러플레이트와 같다면, 새로운 언어의 보일러플레이트 코드로 바꿈
      if (
        getCode === boilerplateCode.python ||
        getCode === boilerplateCode.javascript ||
        getCode === boilerplateCode.java ||
        getCode === boilerplateCode.c
      ) {
        setCode(boilerplateCode[language]);
      } else {
        // 보일러플레이트가 아니면 로컬스토리지의 코드를 그대로 사용
        setCode(getCode);
      }
    } else {
      // 로컬스토리지에 코드가 없으면 새로운 언어의 보일러플레이트 코드로 설정
      setCode(boilerplateCode[language]);
    }
  }, [language, problemId]);

  useEffect(() => {
    if (problemId) {
      localStorage.setItem(`code_${problemId}`, code);
      localStorage.setItem(`language_${problemId}`, language);
    }
  }, [code, language, problemId]);

  const handleModalClose = () => {
    setErrorCode(null);
    navigate("/game/contest");
  };

  const handleExecution = async () => {
    try {
      const response = await execution({
        id: Number(problemId),
        sourcecode: code,
      });
    } catch (err: any) {
      if (err.response) {
        setErrorCode(err.response.data.code);
      } else {
        setErrorCode("UNKNOWN");
      }
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) {
      setIsModalOpen(true);
      return;
    }

    setSubmissionResults((prevResults) => ["처리중...", ...prevResults]);
    setIsSubmitting(true);
    setActiveTab("results");

    try {
      const res = await contestSubmit({
        contestId: Number(contestId),
        problemId: Number(problemId),
        sourcecode: code,
        language: language.toUpperCase(),
      });

      setSubmissionResults((prevResults) => {
        const updatedResults = [...prevResults];
        updatedResults[0] = res;
        return updatedResults;
      });
    } catch (err: any) {
      console.error(err);
      setSubmissionResults((prevResults) => {
        const updatedResults = [...prevResults];
        updatedResults[0] = "런타임 에러";
        return updatedResults;
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLanguageChange = (selectedLanguage: string, file: string) => {
    setLanguage(selectedLanguage.toLowerCase());
    setFileName(file);
    if (problemId) {
      localStorage.setItem(
        `language_${problemId}`,
        selectedLanguage.toLowerCase(),
      );
    }
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
        id: Number(problemId),
        sourcecode: code,
        language: language.toUpperCase(),
      });
      setTestResult([...res]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTestLoading(false);
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
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <S.HeaderBox>
        <S.FileName>{fileName}</S.FileName>
        <S.ButtonBox>
          <S.Button>
            <Dropdown
              onSelectLanguage={(selectedLanguage, file) => {
                handleLanguageChange(selectedLanguage, file);
              }}
              problemId={problemId!}
            />
          </S.Button>
          <S.Button onClick={onTestcaseClick}>
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
      <AceEditor
        mode={language === "c" ? "c_cpp" : language}
        theme="monokai"
        height="20rem"
        width="100%"
        fontSize={16}
        value={code}
        onChange={(value) => setCode(value || "")}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
        }}
        editorProps={{ $blockScrolling: true }}
      />
      <S.TestBoxLayout>
        <TestBox
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          testResult={testResult}
          isTestLoading={isTestLoading}
          submissionResults={submissionResults}
        />
      </S.TestBoxLayout>
      {errorCode && (
        <ErrorModal errorCode={errorCode} onClose={handleModalClose} />
      )}
    </S.EditorLayout>
  );
};
