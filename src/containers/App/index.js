import React from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import FlexWrapper from '../../components/FlexWrapper';
import GlobalStyle from '../../components/GlobalStyle';

import Home from '../../routes/Home';
import NotFound from '../../routes/NotFound';

function App() {
  const AppWrapper = styled(FlexWrapper)`
    flex: 1;
  `;

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
