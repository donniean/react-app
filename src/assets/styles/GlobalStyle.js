import { createGlobalStyle, injectGlobal } from 'styled-components';
import { normalize } from 'polished';

const GlobalStyle = createGlobalStyle`${normalize()}`;

export default GlobalStyle;
