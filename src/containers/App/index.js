import React from 'react';
import { hot } from 'react-hot-loader';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import styled from 'styled-components';

import FlexCol from '../../components/FlexCol';
import GlobalStyle from '../../styles/GlobalStyle';

import Home from '../../routes/Home';
import NotFound from '../../routes/NotFound';

const AppWrapper = styled(FlexCol)`
  flex: 1;
`;

function App() {
  return (
    <AppWrapper>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </AppWrapper>
  );
}

export default hot(module)(App);
