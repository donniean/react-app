import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import NotFound from './NotFound';

const routes = [
  { component: Home, path: '/', exact: true, auth: 1, title: 'Hello React' },
  { component: NotFound, title: '404' }
];

function Routes() {
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route key={index} {...route} />
      ))}
    </Switch>
  );
}

export default Routes;
