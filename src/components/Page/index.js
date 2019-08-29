import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTitle } from 'react-use';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor || theme.bg.primary};
`;

function Page({ documentTitle, children, ...rest }) {
  useTitle(documentTitle);

  return <Wrapper {...rest}>{children}</Wrapper>;
}

Page.propTypes = {
  documentTitle: PropTypes.string,
  children: PropTypes.node
};

Page.defaultProps = {
  documentTitle: '',
  children: null
};

export default Page;
