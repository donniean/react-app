import 'sanitize.css';
import 'sanitize.css/typography.css';
import 'sanitize.css/forms.css';

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    background-color: #fff;
  }

  * {
    margin: 0;
    padding: 0;
  }

  input,
  button,
  textarea {
    appearance: none;
    outline: 0;
    border: 0;
  }
`;

export default GlobalStyle;
