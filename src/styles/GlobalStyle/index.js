import { createGlobalStyle, css } from 'styled-components';

const globalStyle = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
  }

  html {
    font-size: 100%;
    line-height: 1.5;
  }

  body {
    padding: constant(safe-area-inset-top) constant(safe-area-inset-right)
      constant(safe-area-inset-bottom) constant(safe-area-inset-left);
    padding: env(safe-area-inset-top) env(safe-area-inset-right)
      env(safe-area-inset-bottom) env(safe-area-inset-left);
  }

  ol,
  ul {
    list-style: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  a {
    text-decoration: none;
  }

  input,
  button,
  textarea {
    border-radius: 0;
    appearance: none;
  }
`;

const GlobalStyle = createGlobalStyle(globalStyle);

export default GlobalStyle;
