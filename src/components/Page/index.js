import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';

import FlexWrapper from '../FlexWrapper';
import DocumentTitle from '../DocumentTitle';

function Page({ title, children, ...rest }) {
  const Wrapper = styled(FlexWrapper)`
    flex: 1;
  `;

  return (
    <Wrapper {...rest}>
      <DocumentTitle>{title}</DocumentTitle>
      {children}
    </Wrapper>
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
