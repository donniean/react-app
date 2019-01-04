import React from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { colorPrimary } from '../../assets/styles/variables';

import FlexWrapper from '../../layouts/FlexWrapper';
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
