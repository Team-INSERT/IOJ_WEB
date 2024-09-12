import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ErrorModal from "@/shared/components/ErrorModal";
import Modal from "@/shared/components/Modal";
import Button from "@/shared/components/Button";
import Dropdown from "@/shared/components/DropDown";
import AceEditor from "react-ace";
import { Submit } from "@/shared/components";
import { TestBox } from "../testbox";
import { execution } from "../../api/execution";
import { contestSubmit } from "../../api/contestSubmt";
import { getTestcase } from "../../api/testcase";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";

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
      setErrorCode(err.response.data.code);
      setSubmissionResults((prevResults) => {
        const updatedResults = [...prevResults];
        updatedResults[0] = "런타임 에러";
        return updatedResults;
      });

      setSubmitStatus("RunTime");
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
      {submitStatus && <Submit mode={submitStatus} />}
      <AceEditor
        mode={
          ["c", "cpp"].includes(language.toLowerCase())
            ? "c_cpp"
            : language.toLowerCase()
        }
        theme="monokai"
        height="18.5rem"
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
        <ErrorModal
          errorCode={errorCode}
          onClose={() => navigate(`/game/contest/${contestId}`)}
        />
      )}
    </S.EditorLayout>
  );
};
