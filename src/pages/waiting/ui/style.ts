import { flex, NexonFont, Pretendard, theme } from "@/shared/style";
import styled from "styled-components";

export const Layout = styled.div`
  width: 100%;
  height: 100vh;
  ${flex.COLUMN_CENTER}
`;
export const BlueBg = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: -1;
  ${flex.COLUMN_START};
`;
export const GreyBg = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: -1;
  ${flex.COLUMN_END};
`;

export const TitleBox = styled.div`
  ${flex.BETWEEN}
  width: 1020px;
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
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  margin-top: 20px;
`;

export const UserCompartmentBox = styled.div`
  position: relative;
  ${flex.CENTER};
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

export const ButtonBox = styled.div`
  ${flex.END};
  gap: 8px;
  margin-top: 2%;
  width: 1020px;
`;

export const Close = styled.img`
  width: 240px;
  height: 240px;
  box-shadow: 0 0 8px 0 rgba(75, 75, 75, 0.1);
`;
