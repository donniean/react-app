import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTabPanel = styled.div`
  flex-shrink: 0;
  width: 100%;
`;

function TabPanel({ children, ...rest }) {
  return <StyledTabPanel {...rest}>{children}</StyledTabPanel>;
}

TabPanel.defaultProps = {};

TabPanel.propTypes = {};

export default TabPanel;
