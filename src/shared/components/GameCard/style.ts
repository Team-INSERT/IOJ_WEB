import styled from "styled-components";
import { NexonFont, flex, theme } from "../../style";

interface DetailsProps {
  bgImage: string;
}

export const Layout = styled.div`
  width: 240px;
  height: 380px;
  border-radius: 15px;
  background-color: ${theme.blueDark};
  cursor: pointer;
`;

export const ImgContainer = styled.div`
  ${flex.CENTER}
  height: 212px;
`;

export const Details = styled.div<DetailsProps>`
  ${flex.COLUMN_CENTER}
  background-image: url(${(props) => props.bgImage});
  height: 168px;
`;

export const Title = styled.div`
  ${NexonFont.NexonBigText}
  padding-top: 4px;
`;

export const SubTitle = styled.div`
  ${flex.COLUMN_CENTER}
  padding-top: 16px;
`;

export const Text = styled.span`
  color: ${theme.grey700};
  ${NexonFont.NexonSmallText}
`;
