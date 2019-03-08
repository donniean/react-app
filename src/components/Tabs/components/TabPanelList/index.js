import React, { Children, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SwipeableViews from 'react-swipeable-views';

function TabPanelList({ children, ...rest }) {
  return <SwipeableViews {...rest}>{children}</SwipeableViews>;
}

TabPanelList.defaultProps = {};

TabPanelList.propTypes = {
  children: PropTypes.node
};

export default TabPanelList;
