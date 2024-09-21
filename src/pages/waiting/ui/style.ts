import { flex, NexonFont, Pretendard, theme } from "@/shared/style";
import styled from "styled-components";

export const Layout = styled.div`
  padding: 160px 216px;
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

export const UserCompartmentContainer = styled.div`
  z-index: 3;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  margin-top: 20px;
`;

export const ButtonBox = styled.div`
  ${flex.END};
  gap: 20px;
  margin-top: 2%;
`;
