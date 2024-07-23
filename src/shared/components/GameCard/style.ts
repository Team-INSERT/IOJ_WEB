import styled from "styled-components";
import { NexonFont, flex, theme } from "../../style";

interface DetailsProps {
  bgImage: string;
}

interface LayoutProps {
  id: number;
}

export const Layout = styled.div<LayoutProps>`
  width: 240px;
  height: 380px;
  border-radius: 15px;
  background-color: ${theme.blueDark};
  cursor: pointer;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 15px;
    background-image: ${(props) =>
      props.id === 1 || props.id === 3 ? `url(${GameCardHover})` : "none"};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    z-index: 2;
  }

  &:hover::after {
    opacity: 1;
  }
`;

export const ImgContainer = styled.div`
  ${flex.CENTER}
  height: 212px;
  position: relative;
  z-index: 1;
`;

export const Details = styled.div<DetailsProps>`
  ${flex.COLUMN_CENTER}
  background-image: url(${(props) => props.bgImage});
  height: 168px;
  position: relative;
  z-index: 1;
`;

export const Title = styled.div`
  ${NexonFont.NexonBigText}
  padding-top: 4px;
  position: relative;
  z-index: 1;
`;

export const SubTitle = styled.div`
  ${flex.COLUMN_CENTER}
  padding-top: 16px;
  position: relative;
  z-index: 1;
`;

export const Text = styled.span`
  color: ${theme.grey700};
  ${NexonFont.NexonSmallText}
  position: relative;
  z-index: 1;
`;
