import styled from "styled-components";
import { Pretendard, flex, theme } from "@/shared/style";

export const Layout = styled.div`
  padding: 4px 8px;
  border-radius: 4px;
  background: ${theme.white};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  ${flex.FLEX};
  align-items: center;
`;
export const Properties = styled.div`
  gap: 35px;
  ${flex.START}
`
export const QustionNumber = styled.div`
  font-weight: bold;
  text-align: left;
  width: 17px;
  ${Pretendard.Text}
  font-weight: bold;
`;
export const Number = styled.div`
  font-size: 19px;
  width: 48px;
  text-align: left;
  ${Pretendard.Text}
`;
export const Title = styled.div`
  font-size: 19px;
  color: #007cff;
  text-align: left;
  ${Pretendard.Text}
`;
export const Stars = styled.div`
  position: absolute;
  right: 8px;
  transform: translateX(-90%);
  ${flex.FLEX};
`;
