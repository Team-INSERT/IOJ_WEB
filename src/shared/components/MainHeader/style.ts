import styled from "styled-components";
import { Pretendard, flex, theme } from "../../style";

export const Layout = styled.div`
  background-color: ${theme.white};
  height: 100px;
  ${flex.FLEX}
  position: relative;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.08);
`;
export const Logo = styled.div`
  ${flex.VERTICAL}
  margin-left: 3.5rem;
`;
export const Menus = styled.div`
  ${flex.FLEX}
  gap: 60px;
  ${Pretendard.Text}
  font-weight: bold;
  position: absolute;
  top: 56px;
  right: 15.75rem;
`;
export const Menu = styled.div<{ isHome: boolean }>`
  color: ${(props) => (props.isHome ? `${theme.black}` : `${theme.grey600}`)};
  cursor: pointer;
`;
export const Details = styled.div`
  ${flex.FLEX}
  gap: 5px;
  ${Pretendard.SmallText}
  color: ${theme.grey300};
  position: absolute;
  right: 9.25rem;
  top: 16px;
`;
export const Login = styled.div`
  color: ${theme.grey600};
  cursor: pointer;
`;
export const Setting = styled.div`
  color: ${theme.grey600};
`;
