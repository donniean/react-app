import React from 'react';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { THEME } from '@/constants';
import Routes from '@/routes';

import GlobalStyle from '@/styles/GlobalStyle';
import themes from '@/styles/themes';

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={themes[THEME]}>
        <HashRouter>
          <Routes />
        </HashRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
