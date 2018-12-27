import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

function PrivateRoute({ component: Component, ...rest }) {
  const isAuthenticated = localStorage.getItem(isAuthenticated);

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
