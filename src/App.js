import React, { Fragment } from 'react';
import { hot } from 'react-hot-loader/root';
import { Router } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import GlobalStyle from './styles/GlobalStyle';
import { defaultTheme as theme } from './styles/themes';

import history from './utils/history';

import Routes from './routes';

function App() {
  return (
    <Fragment>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <Routes />
        </Router>
      </ThemeProvider>
    </Fragment>
  );
}

export default hot(App);
