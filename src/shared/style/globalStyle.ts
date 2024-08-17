import { createGlobalStyle } from "styled-components";
import { theme } from ".";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'NEXONFootballGothicBA1';
    src: url('https://gcore.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/NEXONFootballGothicBA1.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}

  :root {
    @media screen and (min-width: 1026px) and (max-width: 1440px) {
      font-size: 90%;
    }

    @media screen and (min-width: 769px) and (max-width: 1025px) {
      font-size: 80%;
    }

    @media screen and (min-width: 541px) and (max-width: 768px) {
      font-size: 70%;
    }

    @media screen and (min-width: 301px) and (max-width: 540px) {
      font-size: 60%;
    }

    @media screen and (max-width: 300px) {
      font-size: 50%;
    }
  }

  body {
    background-color: ${theme.white};
  }

  ul,
  li {
    list-style: none;
  }

  p {
    display: inline-block;
  }

  a {
    display: inline-block;
    text-decoration: none;
    color: inherit;
  }

  label {
    cursor: pointer;
  }

  input,
  textarea {
    -moz-user-select: auto;
    -webkit-user-select: auto;
    -ms-user-select: auto;
    user-select: auto;
    border: none;
    outline: none;
    resize: none;
  }

  input:focus {
    outline: none;
  }

  button {
    outline: none;
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
  }
`;

export default GlobalStyle;
