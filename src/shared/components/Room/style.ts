import styled, { css } from "styled-components";
import { NexonFont, flex, theme } from "@/shared/style";

interface LayoutProps {
  backgroundImage: string;
  category: string;
}

export const Layout = styled.div<LayoutProps>`
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  padding-left: 19px;
  width: 358px;
  height: 89px;
  ${flex.FLEX}
`;

export const Number = styled.div<{ category: string }>`
  ${NexonFont.NexonSmallTitle}
  font-weight: bold;
  ${flex.CENTER}
  padding-right: 19px;

  ${(props) =>
    props.category === "contest"
      ? css`
          background: linear-gradient(180deg, #005dbf 0%, #ff86c7 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        `
      : css`
          background: linear-gradient(180deg, #005dbf 0%, #0191fe 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        `}
`;

export const Line = styled.div`
  border-left: 1px solid ${theme.grey200};
  height: 100%;
`;

export const Details = styled.div`
  ${flex.COLUMN_HORIZONTAL}
  padding-left: 19px;
`;

export const Title = styled.div`
  padding-bottom: 12px;
  ${NexonFont.NexonSmallText}
`;

export const CartegoryNumber = styled.div`
  ${flex.FLEX}
  ${NexonFont.NexonCaption}
  color: ${theme.grey400};
  gap: 2px;
`;

export const TimeLevel = styled.div`
  ${flex.FLEX}
  ${NexonFont.NexonCaption}
  padding-top: 4px;
  gap: 2px;
`;

export const DarkGrayFont = styled.div`
  color: ${theme.grey700};
`;
