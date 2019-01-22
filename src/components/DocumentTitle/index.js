import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

function DocumentTitle({ title }) {
  return <Helmet title={title} />;
}

DocumentTitle.propTypes = {
  title: PropTypes.string
};

DocumentTitle.defaultProps = {
  title: ''
};

export default DocumentTitle;
