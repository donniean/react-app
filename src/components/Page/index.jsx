import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTitle } from 'react-use';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow-y: auto;
  background-color: ${({ backgroundcolor, theme }) =>
    backgroundcolor || theme.bg.primary};
  -webkit-overflow-scrolling: touch;
`;

function Page({ documentTitle, children, ...rest }) {
  useTitle(documentTitle);

  return <Wrapper {...rest}>{children}</Wrapper>;
}

Page.propTypes = {
  documentTitle: PropTypes.string,
  children: PropTypes.node,
};

Page.defaultProps = {
  documentTitle: '',
  children: null,
};

export default Page;
