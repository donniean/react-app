import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';

import FlexContainer from '../FlexContainer';
import DocumentTitle from '../DocumentTitle';

const Wrapper = styled(FlexContainer)`
  flex-direction: row;
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
