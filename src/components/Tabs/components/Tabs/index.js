import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Tabs as ReactTabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const StyledTabs = styled(ReactTabs)`
  display: flex;
  flex-direction: column;
`;

function Tabs({ children, ...rest }) {
  return <StyledTabs {...rest}>{children}</StyledTabs>;
}

export default Tabs;
