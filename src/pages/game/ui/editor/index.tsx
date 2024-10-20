import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Split from "react-split";
import AceEditor from "react-ace";
import ErrorModal from "@/shared/components/ErrorModal";
import Modal from "@/shared/components/Modal";
import Button from "@/shared/components/Button";
import Dropdown from "@/shared/components/DropDown";
import { useWebSocket } from "@/shared/hooks/useWebSocket";
import { Submit } from "@/shared/components";
import { TestBox } from "../testbox";
import { contestSubmit } from "../../api/contestSubmt";
import { getTestcase } from "../../api/testcase";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";
import * as S from "./style";
import { boilerplateCode } from "../../api/boilerplateCode";

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
    setCode(newCode);
    if (contestId && problemId) {
      localStorage.setItem(
        `code_${contestId}_${problemId}_${languages}`,
        newCode,
      );
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
  const [isInputDisabled, setInputDisabled] = useState(false);
  const [editorHeight, setEditorHeight] = useState<string>("18.5rem");
  const [input, setInput] = useState<string>("");
  const {
    clientRef,
    sessionIdRef,
    consoleOutput,
    isExecutionActive,
    setConsoleOutput,
    connectWebSocket,
    disconnectWebSocket,
  } = useWebSocket();

  const [executionActive, setExecutionActive] = useState(isExecutionActive);

  const [submitStatus, setSubmitStatus] = useState<
    "Correct" | "RunTime" | "InCorrect" | null
  >(null);
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
      if (res === "ACCEPTED") {
        setSubmitStatus("Correct");
      } else if (res === "WRONG_ANSWER") {
        setSubmitStatus("InCorrect");
      } else if (res === "RUNTIME_ERROR") {
        setSubmitStatus("RunTime");
      } else {
        setSubmitStatus("InCorrect");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.response.data.message);
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
        <AceEditor
          mode={
            ["c", "cpp"].includes(languages.toLowerCase())
              ? "c_cpp"
              : languages.toLowerCase()
          }
          theme="monokai"
          height={editorHeight}
          width="100%"
          fontSize={16}
          value={code}
          onChange={(value: any) => handleCodeChange(value || "")}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
          }}
          editorProps={{ $blockScrolling: true }}
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
            isInputDisabled={isInputDisabled}
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
