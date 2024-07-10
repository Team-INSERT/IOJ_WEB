import styled from "styled-components";
import { Pretendard, flex, theme } from "../../style";

export const Layout = styled.div`
  height: 100px;
  ${flex.FLEX}
  position: relative;
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
`;
export const Setting = styled.div`
  color: ${theme.grey600};
`;
