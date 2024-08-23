import React, { useEffect, useState } from "react";
import Button from "@/shared/components/Button";
import { theme } from "@/shared/style";
import * as S from "./style";
import { gameDetail } from "../../api/gameDetail";
import { TestBoxProps, problemDetailType } from "../../interfaces/gameInterfaces";

export const TestBox = ({
  activeTab,
  setActiveTab,
  testResult,
  isTestLoading,
}: TestBoxProps) => {
  const { pathname } = window.location;
  const segments = pathname.split("/");
  const problemNum = parseInt(segments[segments.length - 1], 10);
  const [acceptCount, setAcceptCount] = useState(0);
  const [problemDetail, setProblemDetail] = useState<problemDetailType>();

  useEffect(() => {
    const countAcceptedTestCases = testResult.filter(
      (testCase) => testCase.verdict === "ACCEPTED",
    ).length;
    setAcceptCount(countAcceptedTestCases);
  }, [testResult]);

  const translateVerdict = (verdict: string) => {
    const verdictMapping: Record<string, React.ReactNode> = {
      WRONG_ANSWER: "불일치",
      ACCEPTED: <span style={{ color: theme.insertBlue }}>일치</span>,
      COMPILATION_ERROR: "컴파일 에러",
      OUT_OF_MEMORY: "메모리 초과",
      TIME_LIMIT_EXCEEDED: "시간초과",
      RUNTIME_ERROR: "런타임 에러",
    };

    return verdictMapping[verdict] || "알 수 없는 결과";
  };

  const isErrorOutput = (verdict: string) =>
    [
      "COMPILATION_ERROR",
      "RUNTIME_ERROR",
      "OUT_OF_MEMORY",
      "TIME_LIMIT_EXCEEDED",
    ].includes(verdict);

  const errorOutput = testResult
    .filter((testCase) => isErrorOutput(testCase.verdict))
    .map(
      (testCase) => `${translateVerdict(testCase.verdict)}\n${testCase.output}`,
    )
    .join("\n");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab, testResult]);

  useEffect(() => {
    const getProblemInfo = async () => {
      try {
        const res = await gameDetail(problemNum);
        setProblemDetail(res)
      } catch (err) {
        console.log(err)
      }
    };
    getProblemInfo();
  }, [problemNum]);

  return (
    <S.Container>
      <S.TabContainer>
        {["execution", "testCases", "results"].map((tab) => (
          <S.Tab
            key={tab}
            active={activeTab === tab}
            onClick={() =>
              setActiveTab(tab as "execution" | "testCases" | "results")
            }
          >
            {tab === "execution" && "실행화면"}
            {tab === "testCases" && "테스트케이스"}
            {tab === "results" && "제출결과"}
          </S.Tab>
        ))}
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
          (isErrorOutput(testResult[0]?.verdict) && !isTestLoading ? (
            <>
              <S.TestCasesHeader>
                테스트케이스 일치 비율 :{" "}
                <S.StyledSpan>{acceptCount}</S.StyledSpan> / {problemDetail?.testcases.length}
              </S.TestCasesHeader>
              <S.TestCasesNote>
                각 입력 케이스의 값이 실제 채점 방식과 동일한 방식으로
                표준입력에 전달됩니다. 일반 실행 발생 시 에러가 없더라도
                테스트케이스 실행에서 에러가 발생하는 경우, 제출 시에도 동일한
                에러가 발생합니다. 코드를 수정하여 다시 시도해 보시기 바랍니다.
              </S.TestCasesNote>
              <pre>{errorOutput}</pre>
            </>
          ) : (
            <>
              <S.TestCasesHeader>
                테스트케이스 일치 비율 :{" "}
                <S.StyledSpan>{acceptCount}</S.StyledSpan> / {problemDetail?.testcases.length}
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
                            <pre>{translateVerdict(testCase.verdict)}</pre>
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
