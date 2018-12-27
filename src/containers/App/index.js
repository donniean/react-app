import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { colorPrimary } from '../../assets/styles/variables';

import GlobalStyle from '../../components/GlobalStyle';
import PrivateRoute from '../../components/PrivateRoute';

import Login from '../Login';
import Home from '../Home';
import NotFound from '../NotFound';

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
        <Route exact path="/auth/login" component={Login} />
        <PrivateRoute path="/" component={Home} />
        <Route exact path="/error/404" component={NotFound} />
        <Redirect to="/error/404" />
      </Switch>
    </AppWrapper>
  );
}

export default hot(module)(App);
