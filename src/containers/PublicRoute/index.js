import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

function PublicRoute({
  isAuthenticated = false,
  component: Component,
  ...rest
}) {
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
}

PublicRoute.propTypes = {
  component: propTypes.node.isRequired,
  path: PropTypes.string
};

PublicRoute.defaultProps = {
  component: null,
  path: null
};

export default PublicRoute;
