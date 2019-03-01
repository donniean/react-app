import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { TabPanel as ReactTabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const StyledTabPanel = styled(ReactTabPanel)``;

function TabPanel({ children, ...rest }) {
  return <StyledTabPanel {...rest}>{children}</StyledTabPanel>;
}

export default TabPanel;
