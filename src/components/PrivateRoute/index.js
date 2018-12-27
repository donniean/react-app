import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const isAuthenticated = 1;

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/auth/login',
              state: { from: props.location }
            }}
          />
        )
      }
      {...rest}
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
    .isRequired,
  path: PropTypes.string
};

PrivateRoute.defaultPros = {
  component: null,
  path: null
};

export default PrivateRoute;
