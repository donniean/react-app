import 'sanitize.css';
import 'sanitize.css/forms.css';
import 'sanitize.css/typography.css';

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 100%;
    line-height: 1.5;
  }

  body {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }

  ol, ul {
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
    appearance: none;
    outline: 0;
    border: 0;
    border-radius: 0;
  }
`;

export default GlobalStyle;
