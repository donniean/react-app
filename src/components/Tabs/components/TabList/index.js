import React from 'react';
import styled from 'styled-components';

import { TabList as ReactTabList } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const StyledTabList = styled(ReactTabList)`
  display: flex;
  flex-direction: column;
`;

function TabList({ children, ...rest }) {
  return <StyledTabList {...rest}>{children}</StyledTabList>;
}

export default TabList;
