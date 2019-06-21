import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AuthRoute from '../containers/AuthRoute';

import Home from './Home';
import NotFound from './NotFound';

const routes = [
  { component: Home, path: '/', exact: true, auth: 0, title: 'Hello React' },
  { component: NotFound, title: '404' }
];

function Routes() {
  return (
    <Switch>
      {routes.map((route, index) => (
        <AuthRoute key={index} {...route} />
      ))}
    </Switch>
  );
}

export default Routes;
