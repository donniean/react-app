import React, { Fragment } from 'react';
import { hot } from 'react-hot-loader';
import { HashRouter as Router } from 'react-router-dom';
import styled from 'styled-components';

import FlexCol from './components/FlexCol';
import GlobalStyle from './styles/GlobalStyle';
import Routes from './routes';

const AppWrapper = styled(FlexCol)`
  flex: 1;
`;

function App() {
  return (
    <Fragment>
      <GlobalStyle />
      <Router>
        <Routes />
      </Router>
    </Fragment>
  );
}

export default hot(module)(App);
