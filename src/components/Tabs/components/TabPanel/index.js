import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function TabPanel({ children, ...rest }) {
  return <div>{children}</div>;
}

TabPanel.defaultProps = {};

TabPanel.propTypes = {
  children: PropTypes.node
};

export default TabPanel;
