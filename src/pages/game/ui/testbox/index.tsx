import { useState } from "react";
import Button from "../../../../shared/components/Button";
import * as S from "./style";

export const TestBox = () => {
  const [activeTab, setActiveTab] = useState<
    "execution" | "testCases" | "results"
  >("execution");

  const testCases = [
    {
      number: 1,
      input: 6,
      output: "1 2 3 4 5 6",
      expected: "1 2 3 4 5 6",
      result: "일치",
    },
    {
      number: 2,
      input: 24,
      output: "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24",
      expected:
        "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24",
      result: "불일치",
    },
  ];

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
        {activeTab === "testCases" && (
          <>
            <S.TestCasesHeader>
              테스트케이스 일치 비율 : <S.StyledSpan>0</S.StyledSpan> / 2
            </S.TestCasesHeader>
            <S.TestCasesNote>
              각 입력 케이스의 값이 실제 채점 방식과 동일한 방식으로 표준입력에
              전달됩니다. 일반 실행 발생 시 에러가 없더라도 테스트케이스
              실행에서 에러가 발생하는 경우, 제출 시에도 동일한 에러가
              발생합니다. 코드를 수정하여 다시 시도해 보시기 바랍니다.
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
                {testCases.map((testCase) => (
                  <S.TableRow key={testCase.number}>
                    <S.TableCell>{testCase.number}</S.TableCell>
                    <S.TableCell>{testCase.input}</S.TableCell>
                    <S.TableCell>{testCase.output}</S.TableCell>
                    <S.TableCell>{testCase.expected}</S.TableCell>
                    <S.TableCell>{testCase.result}</S.TableCell>
                  </S.TableRow>
                ))}
              </S.TableBody>
            </S.Table>
          </>
        )}
        {activeTab === "results" && (
          <div>
            <S.Text>제출 결과 화면</S.Text>
          </div>
        )}
      </S.Content>
    </S.Container>
  );
};
