import { createGlobalStyle } from 'styled-components';
import { normalize } from 'polished';

const GlobalStyle = createGlobalStyle`
  ${normalize()}

  html, body {
    height: 100%;
  }

  body {
    display: flex;
    flex-direction: column;
  }

  h1 {
    margin: 0;
  }

  div#root {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
`;

export default GlobalStyle;
