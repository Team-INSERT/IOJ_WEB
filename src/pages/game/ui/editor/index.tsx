import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Split from "react-split";
import {
  Submit,
  Dropdown,
  Button,
  ErrorModal,
  Modal,
} from "@/shared/components";
import { gameSubmit } from "@/pages/game/api/gameSubmit";
import { useWebSocket } from "@/shared/hooks/useWebSocket";
import { TestBox } from "../testbox";
import { AceEditorComponent } from "../AceEditor";
import { contestSubmit } from "../../api/contestSubmt";
import { getTestcase } from "../../api/testcase";
import { boilerplateCode } from "../../api/boilerplateCode";
import * as S from "./style";

interface TestCase {
  index: number;
  input: number;
  output: string;
  expectOutput: string;
  verdict: string;
}
interface CodeEditorProps {
  isInputDisable: boolean;
}
export const CodeEditor = ({ isInputDisable }: CodeEditorProps) => {
  const navigate = useNavigate();
  const {
    clientRef,
    sessionIdRef,
    consoleOutput,
    isExecutionActive,
    setConsoleOutput,
    connectWebSocket,
    disconnectWebSocket,
  } = useWebSocket();

  const { contestId, problemId } = useParams<{
    contestId: string;
    problemId: string;
  }>();

  const testBoxRef = useRef<{ resetAndEnableTerminal: () => void } | null>(
    null,
  );

  const [code, setCode] = useState<string>("");
  const [languages, setLanguage] = useState<string>("python");
  const [fileName, setFileName] = useState<string>("Main.py");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "execution" | "testCases" | "results"
  >("execution");
  const [isTestLoading, setIsTestLoading] = useState<boolean>(false);
  const [isExecuteLoading, setIsExecuteLoading] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<TestCase[]>([]);
  const [submissionResults, setSubmissionResults] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [boilerplate, setBoilerplate] = useState("");
  const [isInputDisabled, setInputDisabled] = useState(false);
  const [editorHeight, setEditorHeight] = useState<string>("18.5rem");
  const [input, setInput] = useState<string>("");
  const [submitStatus, setSubmitStatus] = useState<
    "Correct" | "RunTime" | "InCorrect" | null
  >(null);
  const [executionActive, setExecutionActive] = useState(isExecutionActive);

  useEffect(() => {
    const savedCode = localStorage.getItem(
      `code_${contestId}_${problemId}_${languages}`,
    );
    if (savedCode) {
      setCode(savedCode);
    } else {
      (async () => {
        try {
          const res = await boilerplateCode(languages);
          setBoilerplate(res);
          setCode(res);
          localStorage.setItem(
            `code_${contestId}_${problemId}_${languages}`,
            res,
          );
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [languages, contestId, problemId]);
  const handleCodeChange = (newCode: string) => {
    if (!isInputDisable) {
      setCode(newCode);
      if (contestId && problemId) {
        localStorage.setItem(
          `code_${contestId}_${problemId}_${languages}`,
          newCode,
        );
      }
    }
  };
  const handleResetCode = async () => {
    try {
      const res = await boilerplateCode(languages);
      setBoilerplate(res);
      setCode(res);
      localStorage.setItem(`code_${contestId}_${problemId}_${languages}`, res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [submitStatus]);
  useEffect(() => {
    const updateEditorHeight = () => {
      const newHeight = window.innerHeight * 0.06;
      setEditorHeight(`${newHeight}vh`);
    };
    updateEditorHeight();
    window.addEventListener("resize", updateEditorHeight);
    return () => window.removeEventListener("resize", updateEditorHeight);
  }, []);

  const handleExecution = useCallback(async () => {
    if (isExecuteLoading) {
      setIsModalOpen(true);
      return;
    }
    if (!executionActive) {
      setExecutionActive(true);
    }
    setActiveTab("execution");
    disconnectWebSocket();
    try {
      testBoxRef.current?.resetAndEnableTerminal();
      setInputDisabled(false);
      await connectWebSocket();
      const client = clientRef.current;
      const userSessionId = sessionIdRef.current;
      if (client && userSessionId) {
        setConsoleOutput("");
        client.publish({
          destination: "/app/execution",
          body: JSON.stringify({
            sessionId: userSessionId,
            sourcecode: code,
            language: languages.toUpperCase(),
          }),
        });
      } else {
        console.log("WebSocket client or session ID is not ready.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsExecuteLoading(false);
    }
  }, [
    isExecuteLoading,
    clientRef,
    connectWebSocket,
    sessionIdRef,
    setConsoleOutput,
    code,
    languages,
    executionActive,
  ]);

  const handleSaveCode = () => {
    if (contestId && problemId) {
      localStorage.setItem(`code_${contestId}_${problemId}_${languages}`, code);
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    if (
      (consoleOutput &&
        consoleOutput.includes("Process finished with exit code 0")) ||
      consoleOutput.includes("Process finished with exit code 1")
    ) {
      setInputDisabled(true);
      disconnectWebSocket();
    }
  }, [consoleOutput, disconnectWebSocket]);

  const handleInputSubmit = useCallback(
    (userResultInput: string) => {
      const client = clientRef.current;
      const userSessionId = sessionIdRef.current;
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
        console.error("WebSocket client or session ID is not ready.");
      }
    },
    [clientRef, sessionIdRef],
  );

  const handleInputChange = (userInput: string) => {
    setInput(userInput);
  };

  const submitProblem = async () => {
    if (contestId && problemId) {
      return contestSubmit({
        contestId: Number(contestId),
        problemId: Number(problemId),
        sourcecode: code,
        language: languages.toUpperCase(),
      });
    }
    return gameSubmit({
      id: Number(problemId),
      sourcecode: code,
      language: languages.toUpperCase(),
    });
  };

  const updateSubmitStatus = (res: string) => {
    if (res === "ACCEPTED") {
      setSubmitStatus("Correct");
    } else if (res === "WRONG_ANSWER") {
      setSubmitStatus("InCorrect");
    } else if (res === "RUNTIME_ERROR") {
      setSubmitStatus("RunTime");
    } else {
      setSubmitStatus("InCorrect");
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
      const res = await submitProblem();

      setSubmissionResults((prevResults) => {
        const updatedResults = [...prevResults];
        updatedResults[0] = res;
        return updatedResults;
      });

      updateSubmitStatus(res);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.response?.data?.message || "Unknown error");
      setSubmissionResults((prevResults) => {
        const updatedResults = [...prevResults];
        updatedResults[0] = "런타임 에러";
        return updatedResults;
      });
      setSubmitStatus(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLanguageChange = (selectedLanguage: string, file: string) => {
    setLanguage(selectedLanguage);
    setFileName(file);
    if (problemId) {
      localStorage.setItem(
        `language_${problemId}`,
        selectedLanguage.toUpperCase(),
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
          <S.Button onClick={handleResetCode}>
            <Button mode="small" color="blue" font="nexon">
              초기화
            </Button>
          </S.Button>
          <S.Button>
            <Dropdown
              onSelectLanguage={(selectedLanguage, file) => {
                handleLanguageChange(selectedLanguage, file);
              }}
              problemId={problemId!}
              contestId={contestId!}
            />
          </S.Button>
          <S.Button onClick={onTestcaseClick}>
            <Button mode="small" color="blue" font="nexon">
              테스트케이스
            </Button>
          </S.Button>
          <S.Button onClick={handleSaveCode}>
            <Button mode="small" color="blue" font="nexon">
              저장
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
      {submitStatus && <Submit mode={submitStatus} />}
      <Split
        direction="vertical"
        sizes={[50, 50]}
        minSize={100}
        gutterSize={10}
        gutterAlign="center"
        style={{ height: "100%", width: "100%" }}
        cursor="row-resize"
        gutter={(direction) => {
          const gutter = document.createElement("div");
          gutter.className = `gutter gutter-${direction}`;
          gutter.onmouseenter = () => {
            gutter.style.cursor = "row-resize";
          };
          return gutter;
        }}
      >
        <AceEditorComponent
          initialCode={code}
          language={languages}
          onCodeChange={handleCodeChange}
          isInputDisabled={isInputDisable}
        />
        <S.TestBoxLayout>
          <TestBox
            ref={testBoxRef}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            testResult={testResult}
            isTestLoading={isTestLoading}
            onInputChange={handleInputChange}
            onSubmit={handleInputSubmit}
            consoleOutput={consoleOutput}
            isExecutionActive={executionActive}
            submissionResults={submissionResults}
            disconnectWebSocket={disconnectWebSocket}
            isInputDisabled={isInputDisable || executionActive}
            errorMessage={errorMessage}
          />
        </S.TestBoxLayout>
      </Split>
      {errorMessage && (
        <ErrorModal
          errorMessage={errorMessage}
          onClose={() => navigate(`/game/contest/${contestId}`)}
        />
      )}
      {isModalOpen && (
        <Modal
          status="좋음"
          mode="알림"
          title="저장이 완료되었습니다!"
          animation
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </S.EditorLayout>
  );
};
