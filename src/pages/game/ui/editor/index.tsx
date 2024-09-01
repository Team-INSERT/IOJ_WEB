import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ErrorModal from "@/shared/components/ErrorModal";
import Modal from "@/shared/components/Modal";
import Editor from "@monaco-editor/react";
import Button from "@/shared/components/Button";
import Dropdown from "@/shared/components/DropDown";
import { useWebSocket } from "@/shared/hooks/useWebSocket";
import { TestBox } from "../testbox";
import { contestSubmit } from "../../api/contestSubmt";
import { getTestcase } from "../../api/testcase";

import * as S from "./style";

interface TestCase {
  index: number;
  input: number;
  output: string;
  expectOutput: string;
  verdict: string;
}

interface SubmitResult {
  status: "ACCEPTED" | "WRONG_ANSWER";
  message: string;
}

export const CodeEditor = () => {
  const navigate = useNavigate();
  const { contestId, problemId } = useParams<{
    contestId: string;
    problemId: string;
  }>();

  const [code, setCode] = useState<string>("");
  const [languages, setLanguage] = useState<string>("PYTHON");
  const [fileName, setFileName] = useState<string>("Main.py");
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "execution" | "testCases" | "results"
  >("execution");

  const [isTestLoading, setIsTestLoading] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<TestCase[]>([]);
  const [submitResults, setSubmitResults] = useState<SubmitResult[]>([]);

  const [input, setInput] = useState<string>("");

  // WebSocket 관련 상태 및 함수 가져오기
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
      setIsExecutionActive(true);
      client.publish({
        destination: "/app/execute",
        body: JSON.stringify({
          sessionId: userSessionId,
          sourcecode: code,
          language: languages,
        }),
      });
    }
  };

  const handleInputSubmit = (userResultInput: string) => {
    if (client && userSessionId) {
      client.publish({
        destination: "/app/input",
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
    setActiveTab("results");
    try {
      const res = await contestSubmit({
        contestId: Number(contestId),
        problemId: Number(problemId),
        sourcecode: code,
        language: languages,
      });

      setSubmitResults((prevResults) => [
        ...prevResults,
        { status: res.status, message: res.message },
      ]);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "알 수 없는 오류 발생";

      setSubmitResults((prevResults) => [
        ...prevResults,
        { status: "WRONG_ANSWER", message: errorMessage },
      ]);
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
        id: Number(problemId),
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
                localStorage.setItem(
                  `language_${problemId}`,
                  selectedLanguage.toUpperCase(),
                );
              }}
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
          submitResults={submitResults}
          onInputChange={handleInputChange}
          onSubmit={handleInputSubmit}
          consoleOutput={consoleOutput} // 서버 응답 값을 TestBox에 전달
          isExecutionActive={isExecutionActive} // 추가된 prop
        />
      </S.TestBoxLayout>
      {errorCode && (
        <ErrorModal errorCode={errorCode} onClose={handleModalClose} />
      )}
    </S.EditorLayout>
  );
};
