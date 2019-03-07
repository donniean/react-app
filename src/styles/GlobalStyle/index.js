import 'sanitize.css';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  html, body {
    height: 100%;
  }

  body {
    display: flex;
    flex-direction: column;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    background-color: #ffffff;
    user-select: none;
    -webkit-touch-callout: none;
  }

  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
  }

  input,
  button,
  textarea {
    appearance: none;
    outline: 0;
    border: 0;
  }

  textarea {
    resize: none;
  }

  div#root {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
`;

export default GlobalStyle;
