import 'sanitize.css';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  html, body {
    height: 100%;
  }

  body {
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
  }

  h1 {
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
