import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

function DocumentTitle({ children }) {
  return <Helmet title={children} />;
}

DocumentTitle.propTypes = {
  children: PropTypes.string
};

DocumentTitle.defaultProps = {
  children: ''
};

export default DocumentTitle;
