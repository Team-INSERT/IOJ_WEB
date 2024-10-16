import { useState } from "react";
import { Button, MainHeader, Level, Stars } from "@/shared/components";
import Plus from "@/assets/Plus.svg";
import Minus from "@/assets/Minus.svg";
import Check from "@/assets/Check.svg";
import Out from "@/assets/Out.png";

import Modal from "@/shared/components/Modal";
import { useNavigate } from "react-router-dom";
import { postProblem } from "@/pages/admin/api/createProblem";
import { validateQuestion } from "@/shared/helper/validateQuestion";
import * as S from "./style";

interface TestCase {
  input: string;
  output: string;
  example: boolean;
}

export interface RequestDataProps {
  title: string;
  content: string;
  inputContent: string;
  outputContent: string;
  level: number;
  memoryLimit: number;
  timeLimit: number;
  testcases: TestCase[];
  source: string;
}

const formatTextWithLineBreaks = (text: string) =>
  text.split("\n").map((str) => (
    <>
      {str}
      <br />
    </>
  ));

export const CreateQuestion = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalSubtitle, setModalSubtitle] = useState("");
  const [modalStatus, setModalStatus] = useState<"나쁨" | "좋음">("나쁨");

  const [problemTitle, setProblemTitle] = useState("");
  const [explain, setExplain] = useState("");
  const [inputExplain, setInputExplain] = useState("");
  const [outputExplain, setOutputExplain] = useState("");
  const [problemMemoryLimit, setProblemMemoryLimit] = useState("");
  const [problemTimeLimit, setProblemTimeLimit] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [testCases, setTestCases] = useState<TestCase[]>([
    { input: "", output: "", example: false },
  ]);
  const [problemSource, setProblemSource] = useState<string>("");

  const addTestCase = () => {
    setTestCases([...testCases, { input: "", output: "", example: false }]);
  };

  const removeTestCase = () => {
    if (testCases.length > 1) {
      setTestCases(testCases.slice(0, -1));
    }
  };

  const toggleSelection = (index: number) => {
    const newTestCases = [...testCases];
    newTestCases[index].example = !newTestCases[index].example;
    setTestCases(newTestCases);
  };

  const handleInputChange = (
    index: number,
    field: keyof TestCase,
    value: string,
  ) => {
    const newTestCases = [...testCases];

    if (field === "input" || field === "output") {
      newTestCases[index][field] = value;
    }

    setTestCases(newTestCases);
  };

  const showModal = (
    status: "나쁨" | "좋음",
    title: string,
    subtitle: string,
  ) => {
    setModalStatus(status);
    setModalTitle(title);
    setModalSubtitle(subtitle);
    setIsModalOpen(true);
  };

  const onQuestionCreateClick = async () => {
    const validationResult = validateQuestion(
      problemTitle,
      explain,
      inputExplain,
      outputExplain,
      selectedLevel,
      problemMemoryLimit,
      problemTimeLimit,
      problemSource,
    );

    if (!validationResult.valid) {
      showModal(
        validationResult.status,
        validationResult.title,
        validationResult.subtitle,
      );
      return;
    }

    const requestData: RequestDataProps = {
      title: problemTitle,
      content: explain,
      inputContent: inputExplain,
      outputContent: outputExplain,
      level: selectedLevel !== null ? selectedLevel : 1,
      memoryLimit: parseInt(problemMemoryLimit, 10),
      timeLimit: parseInt(problemTimeLimit, 10),
      testcases: testCases,
      source: problemSource,
    };
    try {
      await postProblem(requestData);
      showModal(
        "좋음",
        "문제 생성에 성공하였습니다!",
        "문제가 성공적으로 생성되었습니다!",
      );
      setProblemTitle("");
      setExplain("");
      setInputExplain("");
      setOutputExplain("");
      setSelectedLevel(null);
      setProblemMemoryLimit("");
      setProblemTimeLimit("");
    } catch (err) {
      showModal(
        "나쁨",
        "문제 생성에 실패하였습니다.",
        "사용자의 네트워크 연결상태를 확인해주세요.",
      );
    }
  };

  return (
    <>
      <MainHeader />
      <S.createQLayout>
        <S.createSection>
          <S.Title>QUESTION CREATE</S.Title>
          <S.UnderBar />
          <S.Box>
            <S.Text>문제명</S.Text>
            <S.Input
              value={problemTitle}
              onChange={(e) => setProblemTitle(e.target.value)}
            />
          </S.Box>
          <S.Box>
            <S.Text>문제 설명</S.Text>
            <S.ExplainInput
              value={explain}
              onChange={(e) => setExplain(e.target.value)}
            />
          </S.Box>
          <S.Box>
            <S.Text>입력 설명</S.Text>
            <S.ExplainInput
              value={inputExplain}
              onChange={(e) => setInputExplain(e.target.value)}
            />
          </S.Box>
          <S.Box>
            <S.Text>출력 설명</S.Text>
            <S.ExplainInput
              value={outputExplain}
              onChange={(e) => setOutputExplain(e.target.value)}
            />
          </S.Box>
          <S.Box>
            <S.Text>문제 출처</S.Text>
            <S.Input
              value={problemSource}
              onChange={(e) => setProblemSource(e.target.value)}
            />
          </S.Box>
          <S.Box>
            <S.Text>레벨</S.Text>
            <S.LebelBox>
              <Level
                options={[1, 2, 3, 4, 5]}
                selectedOption={selectedLevel}
                onSelect={setSelectedLevel}
              />
            </S.LebelBox>
          </S.Box>
          <S.Box>
            <S.Text>메모리 제한</S.Text>
            <S.Input
              type="number"
              value={problemMemoryLimit}
              onChange={(e) => setProblemMemoryLimit(e.target.value)}
            />
          </S.Box>
          <S.Box>
            <S.Text>시간 제한</S.Text>
            <S.Input
              type="number"
              value={problemTimeLimit}
              onChange={(e) => setProblemTimeLimit(e.target.value)}
            />
          </S.Box>
          <S.Box>
            <S.Text>
              테스트 케이스 (좌: 입력, 우: 출력) 토글 버튼으로 등록 가능
            </S.Text>
            {testCases.map((testCase, index) => (
              <S.TestBox>
                <S.InputBox
                  value={testCase.input}
                  onChange={(e) =>
                    handleInputChange(index, "input", e.target.value)
                  }
                />
                <S.InputBox
                  value={testCase.output}
                  onChange={(e) =>
                    handleInputChange(index, "output", e.target.value)
                  }
                />
                <S.CheckButton
                  onClick={() => toggleSelection(index)}
                  selected={testCase.example}
                >
                  <img src={Check} alt="Check" />
                </S.CheckButton>
              </S.TestBox>
            ))}
            <S.ButtonContainer>
              <S.ControlButton onClick={removeTestCase}>
                <img src={Minus} alt="Minus" />
              </S.ControlButton>
              <S.ControlButton onClick={addTestCase}>
                <img src={Plus} alt="Plus" />
              </S.ControlButton>
            </S.ButtonContainer>
          </S.Box>
          <S.BoxFooter>
            <S.Out onClick={() => navigate("/admin")}>
              <img src={Out} alt="Out" />
              나가기
            </S.Out>
            <Button mode="small" color="blue" onClick={onQuestionCreateClick}>
              문제 생성
            </Button>
          </S.BoxFooter>
        </S.createSection>
        <S.previewSection>
          <S.ProblemTitleBox>
            <S.NameBox>
              <S.ProblemName>{problemTitle}</S.ProblemName>
              <S.Star>
                <Stars value={selectedLevel ?? 0} />
              </S.Star>
            </S.NameBox>
          </S.ProblemTitleBox>
          <S.MiniBox>
            <S.TimeBox>
              시간 제한 <S.span>: {problemTimeLimit} Sec</S.span>
            </S.TimeBox>
            <S.Memory>
              메모리 제한 <S.span>: {problemMemoryLimit} MB</S.span>
            </S.Memory>
          </S.MiniBox>
          <S.ProblemContentBox>
            <S.Problem>문제</S.Problem>
            <S.ProblemContent>
              {formatTextWithLineBreaks(explain)}
            </S.ProblemContent>
            <S.Problem>입력</S.Problem>
            <S.ProblemContent>
              {formatTextWithLineBreaks(inputExplain)}
            </S.ProblemContent>
            <S.Problem>출력</S.Problem>
            <S.ProblemContent>
              {formatTextWithLineBreaks(outputExplain)}
            </S.ProblemContent>
            <S.Problem>출처</S.Problem>
            <S.ProblemContent>
              {formatTextWithLineBreaks(problemSource)}
            </S.ProblemContent>
          </S.ProblemContentBox>
          <S.TestBox>
            <S.TestInputBox>
              <S.TestInput>입력 예제</S.TestInput>
              <S.BoxLayout>
                {testCases.map((testCase) => (
                  <S.ExBox>{formatTextWithLineBreaks(testCase.input)}</S.ExBox>
                ))}
              </S.BoxLayout>
            </S.TestInputBox>
            <S.TestOutputBox>
              <S.TestInput>출력 예제</S.TestInput>
              <S.BoxLayout>
                {testCases.map((testCase) => (
                  <S.ExBox>{formatTextWithLineBreaks(testCase.output)}</S.ExBox>
                ))}
              </S.BoxLayout>
            </S.TestOutputBox>
          </S.TestBox>
        </S.previewSection>
        {isModalOpen && (
          <Modal
            status={modalStatus}
            mode="알림"
            title={modalTitle}
            subtitle={modalSubtitle}
            onClose={() => setIsModalOpen(false)}
            animation
          />
        )}
      </S.createQLayout>
    </>
  );
};
