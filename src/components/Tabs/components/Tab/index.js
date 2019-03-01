import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Tab as ReactTab } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';

const StyleTab = styled(ReactTab)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 25%;
  padding: 20px;
`;

function Tab({ children, ...rest }) {
  return <StyleTab {...rest}>{children}</StyleTab>;
}

Tab.defaultProps = {};

Tab.propTypes = {};

export default Tab;
