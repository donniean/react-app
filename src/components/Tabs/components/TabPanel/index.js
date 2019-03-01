import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { TabPanel as ReactTabPanel } from 'react-tabs';

const StyledTabPanel = styled(ReactTabPanel)`
  flex-shrink: 0;
  width: 100%;
`;

function TabPanel({ children, ...rest }) {
  return <StyledTabPanel {...rest}>{children}</StyledTabPanel>;
}

TabPanel.defaultProps = {};

TabPanel.propTypes = {};

export default TabPanel;
