import styled from "styled-components";
import { Pretendard, flex } from "@/shared/style";

export const Layout = styled.div`
  padding: 4px 8px;
  ${flex.CENTER}
  border-radius: 4px;
  background: var(--white, #fff);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  ${Pretendard.Text}
`;
export const QustionNumber = styled.div`
  font-weight: bold;
  padding-left: 35px;
`;
export const Number = styled.div`
  padding: 0 36px;
  font-size: 19px;
  text-align: left;
`;
export const Title = styled.div`
  font-size: 19px;
  color: #007cff;
  text-align: left;
`;
export const Stars = styled.div`
  margin-left: auto;
`;
