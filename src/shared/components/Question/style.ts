import { Pretendard, flex } from "../../style";
import styled from "styled-components";

export const Layout = styled.div`
  padding: 4px 8px;
  ${flex.CENTER}
  border-radius: 4px;
  background: var(--white, #fff);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
export const QustionNumber = styled.div`
  font-weight: bold;
  padding-left: 35px;
  ${Pretendard.Text}
  font-weight: bold;
`;
export const Number = styled.div`
  padding: 0 36px;
  font-size: 19px;
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
  margin-left: auto;
`;
