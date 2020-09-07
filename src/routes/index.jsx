import React from 'react';
import { Switch } from 'react-router-dom';

import AuthRoute from '../containers/AuthRoute';

import Home from './Home';
import NotFound from './NotFound';

const routes = [
  {
    key: 0,
    component: Home,
    path: '/',
    exact: true,
    auth: 0,
    title: 'Hello React',
  },
  { key: 1, component: NotFound, title: '404' },
];

function Routes() {
  return (
    <Switch>
      {routes.map(({ key, ...props }) => (
        <AuthRoute key={key} {...props} />
      ))}
    </Switch>
  );
}

export default Routes;
