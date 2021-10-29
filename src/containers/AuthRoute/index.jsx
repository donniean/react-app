import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getNextURL, getSearchObj, getSearchStr } from '@/utils/url';

function AuthRoute({ auth, component: Component, title, ...rest }) {
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;

  if (auth === 1) {
    return (
      <Route
        render={(props) => {
          const { location } = props;
          const next = getNextURL(location);
          const search = getSearchStr({ next });
          return isAuthenticated ? (
            <Component documentTitle={title} {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/auth/login',
                search,
              }}
            />
          );
        }}
        {...rest}
      />
    );
  }
  if (auth === -1) {
    return (
      <Route
        render={(props) => {
          const { location } = props;
          const { next = '' } = getSearchObj(location);
          return isAuthenticated ? (
            <Redirect
              to={{
                pathname: next,
              }}
            />
          ) : (
            <Component documentTitle={title} {...props} />
          );
        }}
        {...rest}
      />
    );
  }
  return (
    <Route
      render={(props) => <Component documentTitle={title} {...props} />}
      {...rest}
    />
  );
}

AuthRoute.propTypes = {
  auth: PropTypes.number,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
    .isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  location: PropTypes.shape({
    hash: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
  }),
  path: PropTypes.string,
};

AuthRoute.defaultProps = {
  auth: 0,
  title: '',
  location: {},
  path: '',
};

export default AuthRoute;
