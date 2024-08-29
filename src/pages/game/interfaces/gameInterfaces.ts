export interface testcaseType {
  input: string;
  output: string;
}
export interface problemDetailType {
  title: string;
  level: number;
  content: string;
  inputContent: string;
  memoryLimit: number;
  testcases: testcaseType[];
  timeLimit: number;
}
export interface problemType {
  id: number;
  level: number;
  title: string;
  status: string;
}
export interface findIdType {
  problems: problemType[];
  findId: number;
}
export interface TestCaseType {
  index: number;
  input: number;
  output: string;
  expectOutput: string;
  verdict: string;
}
export interface TestBoxProps {
  activeTab: "execution" | "testCases" | "results";
  setActiveTab: (tab: "execution" | "testCases" | "results") => void;
  testResult: TestCaseType[];
  isTestLoading: boolean;
  submissionResult: string;
}
