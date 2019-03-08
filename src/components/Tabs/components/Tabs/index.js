import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTabs = styled.div`
  display: flex;
  flex-direction: column;
`;

function Tabs({ defaultIndex, children, ...rest }) {
  return <StyledTabs {...rest}>{children}</StyledTabs>;
}

Tabs.defaultProps = {
  defaultIndex: 0,
  activeColor: '#61dafb'
};

Tabs.propTypes = {
  defaultIndex: PropTypes.number,
  activeColor: PropTypes.string,
  children: PropTypes.node
};

export default Tabs;
