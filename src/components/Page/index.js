import React from 'react';
import propTypes from 'prop-types';

import FlexWrapper from '../FlexWrapper';
import DocumentTitle from '../DocumentTitle';

function Page({ title, children, ...rest }) {
  return (
    <FlexWrapper {...rest}>
      <DocumentTitle>{title}</DocumentTitle>
      {children}
    </FlexWrapper>
  );
}

Page.propTypes = {
  title: propTypes.string,
  children: propTypes.oneOfType([propTypes.func, propTypes.element])
};

Page.defaultProps = {
  title: '',
  children: null
};

export default Page;
