import React from 'react';
import styled from 'styled-components';

import { ReactTabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const StyledTabs = styled(ReactTabs)`
  display: flex;
  flex-direction: column;
`;

function Tab({ children, ...rest }) {
  return <StyledTabs {...rest}>{children}</StyledTabs>;
}

export default Tab;
