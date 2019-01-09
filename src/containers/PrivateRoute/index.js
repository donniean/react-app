import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

function PrivateRoute({
  isAuthenticated = false,
  component: Component,
  ...rest
}) {
  return (
    <Route
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/auth/login',
              search: `?${JSON.stringify(props)}`
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

PrivateRoute.defaultProps = {
  component: null,
  path: null
};

export default PrivateRoute;
