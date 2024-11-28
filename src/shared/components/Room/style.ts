import styled, { css } from "styled-components";
import { NexonFont, flex, theme } from "@/shared/style";

export const Layout = styled.div`
  background-size: cover;
  width: 100%;
  height: 81px;
  ${flex.FLEX}
  border-radius: 8px;
  border: 1px solid ${theme.grey100};
  background-color: ${theme.white};
  box-shadow: 0 4px 4px 0 rgba(92, 92, 92, 0.1);
  position: relative;
  overflow: hidden;
`;
export const NumberLayout = styled.div`
  height: 100%;
  width: 87px;
  border-right: 1px solid ${theme.grey200};
  ${flex.CENTER};
`;
export const Number = styled.div`
  ${NexonFont.NexonSmallTitle}
  ${flex.CENTER}
  font-weight: 700;
  background: linear-gradient(180deg, #005dbf 0%, #0191fe 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const Details = styled.div`
  ${flex.COLUMN_HORIZONTAL}
  padding-left: 20px;
  gap: 8px;
`;

export const Title = styled.p`
  ${NexonFont.NexonSmallText};
  color: ${theme.grey800};
`;

export const RoomInfoDetails = styled.div`
  ${flex.COLUMN_FLEX};
  align-items: start;
`;

export const CartegoryNumber = styled.div`
  ${flex.FLEX}
  ${NexonFont.NexonCaption}
  color: ${theme.grey400};
`;

export const TimeLevel = styled.div`
  ${flex.FLEX}
  ${NexonFont.NexonCaption}
`;

export const Grey700Font = styled.div`
  color: ${theme.grey700};
`;
export const Grey400Font = styled.span`
  color: ${theme.grey400};
`;
export const BlueBgLayout = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  ${flex.START};
`;
export const GrayBgLayout = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  ${flex.END};
`;
