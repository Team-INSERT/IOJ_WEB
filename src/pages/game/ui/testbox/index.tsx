import { useEffect, useState } from "react";
import Button from "@/shared/components/Button";
import { theme } from "@/shared/style";
import * as S from "./style";

interface TestCase {
  index: number;
  input: number;
  output: string;
  expectOutput: string;
  verdict: string;
}

interface TestBoxProps {
  activeTab: "execution" | "testCases" | "results";
  setActiveTab: (tab: "execution" | "testCases" | "results") => void;
  testResult: TestCase[];
  isTestLoading: boolean;
}

export const TestBox = ({
  activeTab,
  setActiveTab,
  testResult,
  isTestLoading,
}: TestBoxProps) => {
  const [acceptCount, setAcceptCount] = useState(0);

  useEffect(() => {
    const countAcceptedTestCases = testResult.filter(
      (testCase) => testCase.verdict === "ACCEPTED",
    ).length;
    setAcceptCount(countAcceptedTestCases);
  }, [testResult]);

  const getTranslateVerdict = (verdict: string) => {
    switch (verdict) {
      case "WRONG_ANSWER":
        return "불일치";
      case "ACCEPTED":
        return <span style={{ color: theme.insertBlue }}>일치</span>;
      case "COMPILATION_ERROR":
        return "컴파일 에러";
      case "OUT_OF_MEMORY":
        return "메모리 초과";
      case "TIME_LIMIT_EXCEEDED":
        return "시간초과";
      case "RUNTIME_ERROR":
        return "런타임 에러";
      default:
        return "알 수 없는 결과";
    }
  };

  const shouldDisplayErrorOutput = (verdict: string) =>
    verdict === "COMPILATION_ERROR" ||
    verdict === "RUNTIME_ERROR" ||
    verdict === "OUT_OF_MEMORY" ||
    verdict === "TIME_LIMIT_EXCEEDED";

  const errorOutput = testResult
    .filter((testCase) => shouldDisplayErrorOutput(testCase.verdict))
    .map((testCase) => {
      if (testCase.verdict === "TIME_LIMIT_EXCEEDED") {
        return `시간초과\n ${testCase.output}`;
      }
      if (testCase.verdict === "COMPILATION_ERROR") {
        return `컴파일 에러\n ${testCase.output}`;
      }
      if (testCase.verdict === "OUT_OF_MEMORY") {
        return `메모리 초과\n ${testCase.output}`;
      }
      if (testCase.verdict === "RUNTIME_ERROR") {
        return `런타임 에러\n ${testCase.output}`;
      }
      return testCase.output;
    })
    .join("\n");

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(activeTab);
  }, [activeTab]);

  return (
    <S.Container>
      <S.TabContainer>
        <S.Tab
          active={activeTab === "execution"}
          onClick={() => setActiveTab("execution")}
        >
          실행화면
        </S.Tab>
        <S.Tab
          active={activeTab === "testCases"}
          onClick={() => setActiveTab("testCases")}
        >
          테스트케이스
        </S.Tab>
        <S.Tab
          active={activeTab === "results"}
          onClick={() => setActiveTab("results")}
        >
          제출결과
        </S.Tab>
      </S.TabContainer>
      <S.Content>
        {activeTab === "execution" && (
          <>
            <S.TestBox>
              <S.Text>
                프로세스가 시작되었습니다. (입력값을 직접 입력해주세요.)
              </S.Text>
              <S.Button>
                <Button mode="small" color="red">
                  정지
                </Button>
              </S.Button>
            </S.TestBox>
            <S.Text>{">"}</S.Text>
            <S.Text>프로세스가 종료되었습니다.</S.Text>
          </>
        )}
        {activeTab === "testCases" &&
          (testResult.some((testCase) =>
            shouldDisplayErrorOutput(testCase.verdict),
          ) ? (
            isTestLoading ? (
              <>
                <S.TestCasesHeader>
                  테스트케이스 일치 비율 :
                  <S.StyledSpan> {acceptCount}</S.StyledSpan> / 2
                </S.TestCasesHeader>
                <S.TestCasesNote>
                  각 입력 케이스의 값이 실제 채점 방식과 동일한 방식으로
                  표준입력에 전달됩니다. 일반 실행 발생 시 에러가 없더라도
                  테스트케이스 실행에서 에러가 발생하는 경우, 제출 시에도 동일한
                  에러가 발생합니다. 코드를 수정하여 다시 시도해 보시기
                  바랍니다.
                </S.TestCasesNote>
                <S.Table>
                  <S.TableHead>
                    <S.TableHeadRow>
                      <S.TableHeader>번호</S.TableHeader>
                      <S.TableHeader>입력값</S.TableHeader>
                      <S.TableHeader>출력값</S.TableHeader>
                      <S.TableHeader>예상 출력값</S.TableHeader>
                      <S.TableHeader>실행 결과</S.TableHeader>
                    </S.TableHeadRow>
                  </S.TableHead>
                  <S.TableBody>
                    {testResult.map((testCase) => (
                      <S.TableRow key={testCase.index}>
                        <S.TableCell>{testCase.index + 1}</S.TableCell>
                        <S.TableCell>로딩중...</S.TableCell>
                        <S.TableCell>로딩중...</S.TableCell>
                        <S.TableCell>로딩중...</S.TableCell>
                        <S.TableCell>로딩중...</S.TableCell>
                      </S.TableRow>
                    ))}
                  </S.TableBody>
                </S.Table>
              </>
            ) : (
              <>
                <S.TestCasesHeader>
                  테스트케이스 일치 비율 :
                  <S.StyledSpan> {acceptCount}</S.StyledSpan> / 2
                </S.TestCasesHeader>
                <S.TestCasesNote>
                  각 입력 케이스의 값이 실제 채점 방식과 동일한 방식으로
                  표준입력에 전달됩니다. 일반 실행 발생 시 에러가 없더라도
                  테스트케이스 실행에서 에러가 발생하는 경우, 제출 시에도 동일한
                  에러가 발생합니다. 코드를 수정하여 다시 시도해 보시기
                  바랍니다.
                </S.TestCasesNote>
                <pre>{errorOutput}</pre>
              </>
            )
          ) : (
            <>
              <S.TestCasesHeader>
                테스트케이스 일치 비율 :
                <S.StyledSpan> {acceptCount}</S.StyledSpan> / 2
              </S.TestCasesHeader>
              <S.TestCasesNote>
                각 입력 케이스의 값이 실제 채점 방식과 동일한 방식으로
                표준입력에 전달됩니다. 일반 실행 발생 시 에러가 없더라도
                테스트케이스 실행에서 에러가 발생하는 경우, 제출 시에도 동일한
                에러가 발생합니다. 코드를 수정하여 다시 시도해 보시기 바랍니다.
              </S.TestCasesNote>
              <S.ScrollLayout>
                <S.Table>
                  <S.TableHead>
                    <S.TableHeadRow>
                      <S.TableHeader>번호</S.TableHeader>
                      <S.TableHeader>입력값</S.TableHeader>
                      <S.TableHeader>출력값</S.TableHeader>
                      <S.TableHeader>예상 출력값</S.TableHeader>
                      <S.TableHeader>실행 결과</S.TableHeader>
                    </S.TableHeadRow>
                  </S.TableHead>
                  <S.TableBody>
                    {testResult.map((testCase) => (
                      <S.TableRow key={testCase.index}>
                        <S.TableCell>{testCase.index + 1}</S.TableCell>
                        <S.TableCell>
                          {isTestLoading ? (
                            `로딩중...`
                          ) : (
                            <pre>{testCase.input}</pre>
                          )}
                        </S.TableCell>
                        <S.TableCell>
                          {isTestLoading ? (
                            `로딩중...`
                          ) : (
                            <pre>{testCase.output}</pre>
                          )}
                        </S.TableCell>
                        <S.TableCell>
                          {isTestLoading ? (
                            `로딩중...`
                          ) : (
                            <pre>{testCase.expectOutput}</pre>
                          )}
                        </S.TableCell>
                        <S.TableCell>
                          {isTestLoading ? (
                            `로딩중...`
                          ) : (
                            <pre>{getTranslateVerdict(testCase.verdict)}</pre>
                          )}
                        </S.TableCell>
                      </S.TableRow>
                    ))}
                  </S.TableBody>
                </S.Table>
              </S.ScrollLayout>
            </>
          ))}
        {activeTab === "results" && (
          <S.ResultBoxContainer>
            <S.ResultBox>처리중...</S.ResultBox>
            <S.ResultBox>정답입니다.</S.ResultBox>
            <S.ResultBox>오답입니다.</S.ResultBox>
            <S.ResultBox>런타임 에러</S.ResultBox>
          </S.ResultBoxContainer>
        )}
      </S.Content>
    </S.Container>
  );
};
