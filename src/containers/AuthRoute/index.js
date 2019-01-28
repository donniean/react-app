import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getSearchObj, getSearchStr, getNextURL } from '../../utils/url';

function AuthRoute({ auth, component: Component, title, ...rest }) {
  const token = localStorage.getItem('token');
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  if (auth === 1) {
    return (
      <Route
        render={props => {
          const { location } = props;
          const next = getNextURL(location);
          const search = getSearchStr({ next });
          return isAuthenticated ? (
            <Component documentTitle={title} {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/auth/login',
                search
              }}
            />
          );
        }}
        {...rest}
      />
    );
  } else if (auth === -1) {
    return (
      <Route
        render={props => {
          const { location } = props;
          const { next = '' } = getSearchObj(location);
          return isAuthenticated ? (
            <Redirect
              to={{
                pathname: next
              }}
            />
          ) : (
            <Component documentTitle={title} {...props} />
          );
        }}
        {...rest}
      />
    );
  } else {
    return (
      <Route
        render={props => <Component documentTitle={title} {...props} />}
        {...rest}
      />
    );
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
