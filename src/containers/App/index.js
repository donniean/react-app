import React from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import FlexContainer from '../../components/FlexContainer';
import GlobalStyle from '../../components/GlobalStyle';

import Home from '../../routes/Home';
import NotFound from '../../routes/NotFound';

const AppWrapper = styled(FlexContainer)`
  flex: 1;
`;

function App() {
  return (
    <AppWrapper>
      <GlobalStyle />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </AppWrapper>
  );
}

export default hot(module)(App);
