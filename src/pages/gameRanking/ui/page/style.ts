import { NexonFont, Pretendard, flex, theme } from "@/shared/style";
import styled from "styled-components";

interface ContainerProps {
  childCount: number;
}

export const Layout = styled.div`
  width: 100%;
  ${flex.HORIZONTAL}
  position: relative;
`
export const Content = styled.div`
  ${flex.COLUMN_CENTER}
  gap: 3.75rem;
  padding-top: 6.25rem;
  padding-bottom: 12rem;
`
export const BlueBg = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`
export const GreyBg = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 607px;
`
export const Title = styled.p`
  ${Pretendard.Title}
`
export const Chart = styled.div`
  ${flex.COLUMN_CENTER}
`
export const Attribute = styled.div`
  ${flex.START}
  gap: 28px;
`
export const PropertyText = styled.p`
  ${NexonFont.NexonBigText}
  color: ${theme.grey800};
  &:nth-child(1) {
    width: 73px;
  }
  &:nth-child(2) {
    width: 174px;
  }
`
export const QuestionsNames = styled.div`
  ${flex.START}
  gap: 16px;
`
export const QuestionLayout = styled.div<ContainerProps>`
  width: ${({ childCount }) => `calc((894px - (${childCount} - 1) * 16px) / ${childCount})`};
  height: 27px;
  ${flex.CENTER}
`
export const QuestionName = styled.p`
  ${NexonFont.NexonBigText}
  color: ${theme.grey800};
`
export const BlueLine = styled.hr`
  width: 100%;
  height: 2px;
  border: none;
  background: linear-gradient(90deg, #F2F2F2 0%, #007cff 100%);
  margin-top: 20px;
`
export const RankingLayout = styled.div`
  margin-top: 40px;
  width: 100%;
  ${flex.COLUMN_HORIZONTAL}
  gap: 16px;
`
export const UserRow = styled.div`
  ${flex.START}
  gap: 40px;
`
export const Ranking = styled.p`
  ${NexonFont.NexonBigText}
  color: ${theme.blueNormal};
  width: 61px;
`
export const Name = styled.p`
  ${NexonFont.NexonBigText}
  color: ${theme.black};
  width: 162px;
`
export const Questions = styled.div`
  ${flex.START}
  gap: 16px;
`
export const Question = styled.div<ContainerProps>`
  width: ${({ childCount }) => `calc((894px - (${childCount} - 1) * 16px) / ${childCount})`}; 
  height: 32px;
  background-color: ${theme.correctGreen};
  border-radius: 4px;
  ${flex.CENTER}
`
export const QuestionSolveRank = styled.p`
  ${NexonFont.NexonBigText}
  color: ${theme.white};
`