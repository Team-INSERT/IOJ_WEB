import { flex, NexonFont, Pretendard, theme } from "@/shared/style";
import styled from "styled-components";

export const Layout = styled.div`
  padding: 140px 216px;
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

export const UserCompartmentBox = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  padding: 10px;
  box-sizing: border-box;
`;

export const ButtonBox = styled.div`
  ${flex.END};
  gap: 20px;
  margin-top: 2%;
`;

export const Crown = styled.div`
  position: absolute;
  top: 0;
  left: 7rem;
`;

export const Close = styled.img`
  width: 240px;
  height: 240px;
`;
