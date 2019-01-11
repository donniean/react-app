import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

function AuthRoute({
  auth,
  component: Component,
  isAuthenticated = false,
  ...rest
}) {
  if (auth === 1) {
    return (
      <Route
        render={props =>
          isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/auth/login'
              }}
            />
          )
        }
        {...rest}
      />
    );
  } else if (auth === -1) {
    return (
      <Route
        render={props =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: '/'
              }}
            />
          ) : (
            <Component {...props} />
          )
        }
        {...rest}
      />
    );
  } else {
    return <Route component={Component} {...rest} />;
  }
}

AuthRoute.propTypes = {
  auth: PropTypes.number,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
    .isRequired,
  path: PropTypes.string
};

AuthRoute.defaultProps = {
  auth: 0,
  component: null,
  path: null
};

export default AuthRoute;
