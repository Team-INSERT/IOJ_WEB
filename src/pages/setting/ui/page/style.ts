import { flex, Pretendard, theme } from "@/shared/style";
import styled from "styled-components";

export const MyPageLayout = styled.div`
  ${flex.FLEX}
  padding: 56px 88px;
`;
export const ProfileDetail = styled.div`
  ${flex.COLUMN_FLEX}
  width: 25%;
`;
export const NameContainer = styled.div`
  ${flex.FLEX}
  padding-bottom: 20px;
`;
export const RowLine = styled.div`
  border-left: 2px solid ${theme.insertBlue};
  height: 36px;
`;
export const Name = styled.p`
  font-family: "Pretendard-Regular";
  font-size: 30px;
  padding-left: 8px;
`;
export const Line = styled.div`
  border-bottom: 1px solid ${theme.grey300};
`;
export const MyProfile = styled.div`
  padding: 11px 0 11px 12px;
  font-family: "Pretendard-Regular";
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
`;
export const SubmitTotal = styled.div`
  padding: 11px 0 11px 12px;
  font-family: "Pretendard-Regular";
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
`;
export const Logout = styled.div`
  padding: 11px 0 11px 12px;
  font-family: "Pretendard-Regular";
  font-size: 15px;
  font-weight: 500;
  color: ${theme.warningRed};
  cursor: pointer;
`;
export const AiLayout = styled.div`
  padding-left: 48px;
`;
export const Evaluation = styled.div`
  padding: 12px 20px;
  border-radius: 8px;
  ${Pretendard.Text}
  border: 1px solid ${theme.grey200};
`;
export const GraghContainer = styled.div`
  ${flex.COLUMN_FLEX}
  padding: 16px 20px;
  background-color: #f4f4f4;
  margin-top: 30px;
  border-radius: 8px;
`;
export const GraphNameDetail = styled.div`
  ${flex.VERTICAL}
  gap: 4px;
`;
export const GraphName = styled.p`
  font-family: "Pretendard-Regular";
  font-size: 15px;
  color: ${theme.grey600};
`;
export const SolutionNumber = styled.div`
  ${flex.FLEX}
  padding: 10px 0 20px 0;
  ${Pretendard.BigText}
`;
export const ThinText = styled.p`
  font-family: "Pretendard-Regular";
  font-size: 24px;
  font-weight: 100;
  color: ${theme.grey900};
`;
export const CircleGraphLayout = styled.div`
  ${flex.FLEX}
  padding:0 0 40px 20px;
`;
export const Graph = styled.div`
  canvas {
    width: 20vw !important;
    height: 20vw !important;
  }
`;
export const GraphDetail = styled.div`
  ${flex.COLUMN_HORIZONTAL}
  margin-left: 40px;
  width: 100%;
`;
export const GraphDetailRow = styled.div`
  ${flex.FLEX}
  padding: 11px 0 11px 12px;
`;
export const GraphTag1 = styled.p`
  ${Pretendard.SmallText}
  width: 140px;
`;
export const GraphTag2 = styled.p`
  ${Pretendard.SmallText}
  margin-left: auto;
`;
export const GraphTag3 = styled.p`
  ${Pretendard.SmallText}
  margin-left: auto;
`;
export const LongLine = styled.div`
  border-bottom: 1px solid ${theme.grey300};
`;
export const TagText = styled.p`
  width: 140px;
`;
export const ProblemText = styled.p`
  ${Pretendard.SmallText};
  font-family: "Pretendard-Regular";
  font-size: 15px;
  font-weight: 200;
  margin-left: auto;
`;
export const PercentText = styled.p`
  ${Pretendard.SmallText}
  font-family: "Pretendard-Regular";
  font-size: 15px;
  font-weight: 200;
  color: ${theme.grey600};
  margin-left: auto;
`;
export const PentagonGraphLayout = styled.div`
  ${flex.FLEX}
  padding: 59px 20px;
`;
