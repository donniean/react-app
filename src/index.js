/**
 *
 * TODO:
 *
 * structure
 *
 * fetch-middleware
 *
 * react
 * prop-types
 * redux
 * thunk/saga
 * immutable
 * router
 *
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';

import App from './containers/App';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);

module.hot && module.hot.accept();
