import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';

import FlexCol from '../FlexCol';
import DocumentTitle from '../DocumentTitle';

const Wrapper = styled(FlexCol)`
  flex: 1;
`;

function Page({ title, children, ...rest }) {
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
