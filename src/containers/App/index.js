import React from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route } from 'react-router-dom';

import FlexWrapper from '../../components/FlexWrapper';
import GlobalStyle from '../../components/GlobalStyle';

import Home from '../../routes/Home';
import NotFound from '../../routes/NotFound';

function App() {
  return (
    <FlexWrapper>
      <GlobalStyle />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </FlexWrapper>
  );
}

export default hot(module)(App);
