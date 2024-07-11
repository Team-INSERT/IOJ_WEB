import styled from "styled-components";
import ContestTitle from "../../../../assets/ContestTitle.svg";
import { NexonFont, theme } from "../../../../shared/style";

export const BackgroundLayout = styled.div`
  background-image: url(${ContestTitle});
  width: 1089px;
  height: 128px;
  cursor: pointer;
`;
export const Layout = styled.div`
  padding: 34px 0 17px 120px;
`;
export const Title = styled.div`
  ${NexonFont.NexonBigTitle}
  color: ${theme.grey900};
`;
export const Date = styled.div`
  ${NexonFont.NexonSmallText}
  color: ${theme.grey600};
`;
