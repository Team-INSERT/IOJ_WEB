import { flex, NexonFont, Pretendard, theme } from "@/shared/style";
import styled from "styled-components";

export const Layout = styled.div`
  width: 100%;
  ${flex.COLUMN_FLEX}
`;
export const BlueBg = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;
export const GreyBg = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 607px;
`;

export const TitleBox = styled.div`
  ${flex.BETWEEN}
`;

export const Title = styled.p`
  ${NexonFont.NexonSmallTitle}
`;

export const Content = styled.p`
  ${NexonFont.NexonText}
  color: ${theme.grey800};
`;
