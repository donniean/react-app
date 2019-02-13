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

  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
  }

  input,
  button,
  textarea {
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
