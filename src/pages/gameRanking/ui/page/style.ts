import { NexonFont, Pretendard, flex, theme } from "@/shared/style";
import styled from "styled-components";

interface ContainerProps {
  childCount: number;
}

export const Layout = styled.div`
  width: 100%;
  ${flex.HORIZONTAL}
`
export const Content = styled.div`
  ${flex.COLUMN_CENTER}
  gap: 3.75rem;
  padding-top: 6.25rem;
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
export const Questions = styled.div`
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