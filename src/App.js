import React, { Fragment } from 'react';
import { hot } from 'react-hot-loader';
import { HashRouter as Router } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import GlobalStyle from './styles/GlobalStyle';
import { defaultTheme as theme } from './styles/themes';

import Routes from './routes';

function App() {
  return (
    <Fragment>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Router>
          <Routes />
        </Router>
      </ThemeProvider>
    </Fragment>
  );
}

export default hot(module)(App);
