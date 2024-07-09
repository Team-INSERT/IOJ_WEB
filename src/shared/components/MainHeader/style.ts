import styled from "styled-components";
import { Pretendard, flex, theme } from "../../style";

export const Layout = styled.div`
  padding: 16px 150px 16px 56px;
  ${flex.FLEX}
`;
export const Logo = styled.div`
  ${flex.VERTICAL}
`;
export const Menus = styled.div`
  ${flex.FLEX}
  gap: 60px;
  padding: 42px 0 0 650px;
  ${Pretendard.Text}
  font-weight: bold;
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
  margin-left: auto;
`;
export const Login = styled.div`
  color: ${theme.grey600};
`;
export const Setting = styled.div`
  color: ${theme.grey600};
`;
