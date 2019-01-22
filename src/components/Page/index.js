import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import FlexCol from '../FlexCol';
import DocumentTitle from '../DocumentTitle';

const Wrapper = styled(FlexCol)`
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background-color: ${props => props.bg || props.theme.bg.primary};
`;

function Page({ title, children, ...rest }) {
  return (
    <Wrapper {...rest}>
      <DocumentTitle title={title} />
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
