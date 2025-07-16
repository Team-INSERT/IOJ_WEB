import React, { useMemo, useRef, useState, useEffect } from "react";
import { Button, MainHeader, Level, Stars } from "@/shared/components";
import Plus from "@/assets/Plus.svg";
import Minus from "@/assets/Minus.svg";
import Check from "@/assets/Check.svg";
import Out from "@/assets/Out.png";

import Modal from "@/shared/components/Modal";
import { useNavigate, useLocation } from "react-router-dom";
import { postProblem, updateProblem, UpdateProblemRequest } from "@/pages/admin/api/createProblem";
import { validateQuestion } from "@/shared/helper/validateQuestion";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as S from "./style";

interface TestCase {
  id: string;
  input: string;
  output: string;
  example: boolean;
}

interface Subtask {
  id: string;
  score: number;
  description: string;
  testcases: TestCase[];
}

export interface RequestDataProps {
  title: string;
  content: string;
  inputContent: string;
  outputContent: string;
  level: number;
  memoryLimit: number;
  timeLimit: number;
  subtaskDtos: Subtask[];
  source: string;
}

const formatTextWithLineBreaks = (text: string) =>
  text.split("\n").map((str) => (
    <React.Fragment key={`line-${str}-${Math.random()}`}>
      {str}
      <br />
    </React.Fragment>
  ));

const generateId = () => Math.random().toString(36).substr(2, 9);

export const CreateQuestion = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalSubtitle, setModalSubtitle] = useState("");
  const [modalStatus, setModalStatus] = useState<"나쁨" | "좋음">("나쁨");
  
  // 수정 모드 관련 상태
  const [isEditMode, setIsEditMode] = useState(false);
  const [problemId, setProblemId] = useState<number | null>(null);

  const [problemTitle, setProblemTitle] = useState("");
  const [explain, setExplain] = useState("");
  const [inputExplain, setInputExplain] = useState("");
  const [outputExplain, setOutputExplain] = useState("");
  const [problemMemoryLimit, setProblemMemoryLimit] = useState("");
  const [problemTimeLimit, setProblemTimeLimit] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [subtasks, setSubtasks] = useState<Subtask[]>([
    {
      id: generateId(),
      score: 0,
      description: "",
      testcases: [{ id: generateId(), input: "", output: "", example: false }],
    },
  ]);
  const [problemSource, setProblemSource] = useState<string>("");

  // 수정 모드로 전환 시 기존 데이터 불러오기
  useEffect(() => {
    if (location.state?.editMode && location.state?.problemId) {
      setIsEditMode(true);
      setProblemId(location.state.problemId);
      // 실제 구현에서는 여기서 API를 호출하여 기존 문제 데이터를 불러와야 합니다
      // 예시: fetchProblemData(location.state.problemId).then(data => {
      //   setProblemTitle(data.title);
      //   setExplain(data.content);
      //   setInputExplain(data.inputContent);
      //   setOutputExplain(data.outputContent);
      //   setProblemSource(data.source);
      //   setSelectedLevel(data.level);
      //   setProblemMemoryLimit(data.memoryLimit.toString());
      //   setProblemTimeLimit(data.timeLimit.toString());
      //   // subtasks는 별도로 처리 필요
      // });
    }
  }, [location.state]);

  const addSubtask = () => {
    setSubtasks([
      ...subtasks,
      {
        id: generateId(),
        score: 0,
        description: "",
        testcases: [{ id: generateId(), input: "", output: "", example: false }],
      },
    ]);
  };

  const removeSubtask = () => {
    if (subtasks.length > 1) {
      setSubtasks(subtasks.slice(0, -1));
    }
  };

  const addTestCase = (subtaskIndex: number) => {
    const newSubtasks = [...subtasks];
    newSubtasks[subtaskIndex].testcases.push({
      id: generateId(),
      input: "",
      output: "",
      example: false,
    });
    setSubtasks(newSubtasks);
  };

  const removeTestCase = (subtaskIndex: number) => {
    const newSubtasks = [...subtasks];
    if (newSubtasks[subtaskIndex].testcases.length > 1) {
      newSubtasks[subtaskIndex].testcases = newSubtasks[subtaskIndex].testcases.slice(0, -1);
      setSubtasks(newSubtasks);
    }
  };

  const toggleSelection = (subtaskIndex: number, testCaseIndex: number) => {
    const newSubtasks = [...subtasks];
    newSubtasks[subtaskIndex].testcases[testCaseIndex].example = 
      !newSubtasks[subtaskIndex].testcases[testCaseIndex].example;
    setSubtasks(newSubtasks);
  };

  const handleSubtaskChange = (
    subtaskIndex: number,
    field: keyof Subtask,
    value: string | number,
  ) => {
    const newSubtasks = [...subtasks];
    if (field === "score") {
      newSubtasks[subtaskIndex][field] = value as number;
    } else if (field === "description") {
      newSubtasks[subtaskIndex][field] = value as string;
    }
    setSubtasks(newSubtasks);
  };

  const handleTestCaseChange = (
    subtaskIndex: number,
    testCaseIndex: number,
    field: keyof TestCase,
    value: string,
  ) => {
    const newSubtasks = [...subtasks];
    if (field === "input" || field === "output") {
      newSubtasks[subtaskIndex].testcases[testCaseIndex][field] = value;
    }
    setSubtasks(newSubtasks);
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
      subtasks,
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
      subtaskDtos: subtasks,
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
      setSubtasks([
        {
          id: generateId(),
          score: 0,
          description: "",
          testcases: [{ id: generateId(), input: "", output: "", example: false }],
        },
      ]);
    } catch (err) {
      showModal(
        "나쁨",
        "문제 생성에 실패하였습니다.",
        "사용자의 네트워크 연결상태를 확인해주세요.",
      );
    }
  };

  const onQuestionUpdateClick = async () => {
    if (!problemId) {
      showModal(
        "나쁨",
        "문제 ID가 없습니다.",
        "수정할 문제를 다시 선택해주세요.",
      );
      return;
    }

    const updateRequestData: UpdateProblemRequest = {
      id: problemId,
      content: explain,
      inputContent: inputExplain,
      outputContent: outputExplain,
    };

    try {
      await updateProblem(updateRequestData);
      showModal(
        "좋음",
        "문제 수정에 성공하였습니다!",
        "문제가 성공적으로 수정되었습니다!",
      );
      setIsEditMode(false);
      setProblemId(null);
    } catch (err) {
      showModal(
        "나쁨",
        "문제 수정에 실패하였습니다.",
        "사용자의 네트워크 연결상태를 확인해주세요.",
      );
    }
  };

  const handleEditMode = (id: number) => {
    setProblemId(id);
    setIsEditMode(true);
    // 실제 구현에서는 여기서 기존 문제 데이터를 불러와서 폼에 채워넣어야 합니다
    // 예시: fetchProblemData(id).then(data => {
    //   setProblemTitle(data.title);
    //   setExplain(data.content);
    //   setInputExplain(data.inputContent);
    //   setOutputExplain(data.outputContent);
    //   // ... 기타 필드들
    // });
  };

  const quillRef = useRef<ReactQuill | null>(null);

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
      const file = input.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result;
          const editor = quillRef.current?.getEditor();
          editor?.insertEmbed(
            editor.getSelection()?.index || 0,
            "image",
            base64,
          );
        };
        reader.readAsDataURL(file);
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [["image"]],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    [],
  );

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
            <ReactQuill
              ref={quillRef}
              value={explain}
              onChange={setExplain}
              modules={modules}
              theme="snow"
              placeholder="문제 설명을 입력해주세요"
              style={{
                width: "40rem",
                marginBottom: "3rem",
              }}
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
            <S.Text>서브태스크</S.Text>
            {subtasks.map((subtask, subtaskIndex) => (
              <S.SubtaskBox key={subtask.id}>
                <S.SubtaskHeader>
                  <S.Text>서브태스크 {subtaskIndex + 1}</S.Text>
                  <S.SubtaskInputs>
                    <S.Input
                      type="number"
                      placeholder="점수"
                      value={subtask.score}
                      onChange={(e) =>
                        handleSubtaskChange(subtaskIndex, "score", parseInt(e.target.value, 10) || 0)
                      }
                    />
                    <S.Input
                      placeholder="설명"
                      value={subtask.description}
                      onChange={(e) =>
                        handleSubtaskChange(subtaskIndex, "description", e.target.value)
                      }
                    />
                  </S.SubtaskInputs>
                </S.SubtaskHeader>
                <S.Text>
                  테스트 케이스 (좌: 입력, 우: 출력) 토글 버튼으로 등록 가능
                </S.Text>
                {subtask.testcases.map((testCase, testCaseIndex) => (
                  <S.TestBox key={testCase.id}>
                    <S.InputBox
                      value={testCase.input}
                      onChange={(e) =>
                        handleTestCaseChange(subtaskIndex, testCaseIndex, "input", e.target.value)
                      }
                    />
                    <S.InputBox
                      value={testCase.output}
                      onChange={(e) =>
                        handleTestCaseChange(subtaskIndex, testCaseIndex, "output", e.target.value)
                      }
                    />
                    <S.CheckButton
                      onClick={() => toggleSelection(subtaskIndex, testCaseIndex)}
                      selected={testCase.example}
                    >
                      <img src={Check} alt="Check" />
                    </S.CheckButton>
                  </S.TestBox>
                ))}
                <S.ButtonContainer>
                  <S.ControlButton onClick={() => removeTestCase(subtaskIndex)}>
                    <img src={Minus} alt="Minus" />
                  </S.ControlButton>
                  <S.ControlButton onClick={() => addTestCase(subtaskIndex)}>
                    <img src={Plus} alt="Plus" />
                  </S.ControlButton>
                </S.ButtonContainer>
              </S.SubtaskBox>
            ))}
            <S.ButtonContainer>
              <S.ControlButton onClick={removeSubtask}>
                <img src={Minus} alt="Minus" />
              </S.ControlButton>
              <S.ControlButton onClick={addSubtask}>
                <img src={Plus} alt="Plus" />
              </S.ControlButton>
            </S.ButtonContainer>
          </S.Box>
          <S.BoxFooter>
            <S.Out onClick={() => navigate("/admin")}>
              <img src={Out} alt="Out" />
              나가기
            </S.Out>
            <S.FooterButtonContainer>
              {isEditMode ? (
                <>
                  <Button mode="small" color="orange" onClick={onQuestionUpdateClick}>
                    문제 수정
                  </Button>
                  <Button 
                    mode="small" 
                    color="red" 
                    onClick={() => {
                      setIsEditMode(false);
                      setProblemId(null);
                    }}
                  >
                    수정 취소
                  </Button>
                </>
              ) : (
                <Button mode="small" color="blue" onClick={onQuestionCreateClick}>
                  문제 생성
                </Button>
              )}
            </S.FooterButtonContainer>
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
              메모리 제한 <S.span>: {problemMemoryLimit} KB</S.span>
            </S.Memory>
          </S.MiniBox>
          <S.ProblemContentBox>
            <S.Problem>문제</S.Problem>
            <S.ProblemContent dangerouslySetInnerHTML={{ __html: explain }} />
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
                     {subtasks.map((subtask, subtaskIndex) => (
             <S.SubtaskPreviewBox key={`preview-${subtask.id}`}>
              <S.Problem>서브태스크 {subtaskIndex + 1} (점수: {subtask.score})</S.Problem>
              <S.ProblemContent>
                {formatTextWithLineBreaks(subtask.description)}
              </S.ProblemContent>
              <S.TestBox>
                <S.TestInputBox>
                  <S.TestInput>입력 예제</S.TestInput>
                  <S.BoxLayout>
                    {subtask.testcases.map((testCase, testCaseIndex) => (
                      <S.ExBox key={`preview-input-${testCase.id}`}>
                        {formatTextWithLineBreaks(testCase.input)}
                      </S.ExBox>
                    ))}
                  </S.BoxLayout>
                </S.TestInputBox>
                <S.TestOutputBox>
                  <S.TestInput>출력 예제</S.TestInput>
                  <S.BoxLayout>
                    {subtask.testcases.map((testCase, testCaseIndex) => (
                      <S.ExBox key={`preview-output-${testCase.id}`}>
                        {formatTextWithLineBreaks(testCase.output)}
                      </S.ExBox>
                    ))}
                  </S.BoxLayout>
                </S.TestOutputBox>
              </S.TestBox>
            </S.SubtaskPreviewBox>
          ))}
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
