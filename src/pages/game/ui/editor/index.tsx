import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ErrorModal from "@/shared/components/ErrorModal";
import Modal from "@/shared/components/Modal";
import Button from "@/shared/components/Button";
import Dropdown from "@/shared/components/DropDown";
import { useWebSocket } from "@/shared/hooks/useWebSocket";
import AceEditor from "react-ace";
import { TestBox } from "../testbox";
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
  const [languages, setLanguage] = useState<string>("python");
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

  const [input, setInput] = useState<string>("");

  const {
    client,
    userSessionId,
    consoleOutput,
    isExecutionActive,
    setConsoleOutput,
    setIsExecutionActive,
  } = useWebSocket();

  useEffect(() => {
    setIsExecutionActive(false);
  }, [setIsExecutionActive]);

  useEffect(() => {
    if (problemId) {
      const savedCode = localStorage.getItem(`code_${problemId}`);
      const savedLanguage = localStorage.getItem(`language_${problemId}`);

      if (savedCode) {
        setCode(savedCode);
      }
      if (savedLanguage) {
        setLanguage(savedLanguage);
      }
    }
  }, [problemId]);

  useEffect(() => {
    if (problemId) {
      localStorage.setItem(`code_${problemId}`, code);
      localStorage.setItem(`language_${problemId}`, languages);
    }
  }, [code, languages, problemId]);

  const handleExecution = () => {
    if (client && userSessionId) {
      setConsoleOutput("");
      setIsExecutionActive(false);
      client.publish({
        destination: "/app/execute",
        body: JSON.stringify({
          sessionId: userSessionId,
          sourcecode: code,
          language: languages.toUpperCase(),
        }),
      });
    }
  };

  const handleInputSubmit = (userResultInput: string) => {
    if (client && userSessionId) {
      client.publish({
        destination: `/app/input`,
        body: JSON.stringify({
          sessionId: userSessionId,
          input: userResultInput,
        }),
      });
      setInput("");
    } else {
      console.log("Execution is not active or session is invalid.");
    }
  };

  const handleInputChange = (userInput: string) => {
    setInput(userInput);
  };

  const handleModalClose = () => {
    setErrorCode(null);
    navigate("/game/contest");
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
        language: languages.toUpperCase(),
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
        language: languages.toUpperCase(),
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
        mode={languages === "c" ? "c_cpp" : languages}
        theme="monokai"
        height="20rem"
        width="100%"
        fontSize={16}
        value={code}
        onChange={(value: any) => setCode(value || "")}
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
          onInputChange={handleInputChange}
          onSubmit={handleInputSubmit}
          consoleOutput={consoleOutput}
          isExecutionActive={isExecutionActive}
          submissionResults={submissionResults}
        />
      </S.TestBoxLayout>
      {errorCode && (
        <ErrorModal errorCode={errorCode} onClose={handleModalClose} />
      )}
    </S.EditorLayout>
  );
};
