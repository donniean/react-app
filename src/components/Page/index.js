import React from 'react';
import PropTypes from 'prop-types';
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
  title: PropTypes.string,
  children: PropTypes.node
};

Page.defaultProps = {
  title: '',
  children: null
};

export default Page;
