import React from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { colorPrimary } from '../../assets/styles/variables';

import GlobalStyle from '../../components/GlobalStyle';

import Home from '../../routes/Home';
import NotFound from '../../routes/NotFound';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function App() {
  return (
    <AppWrapper>
      <GlobalStyle />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/error/404" component={NotFound} />
        <Redirect to="/error/404" />
      </Switch>
    </AppWrapper>
  );
}

export default hot(module)(App);
