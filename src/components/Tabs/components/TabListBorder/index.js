import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Border = styled.div`
  position: absolute;
  bottom: 0;
  height: 3px;
  width: 50px;
  background-color: ${props => props.color},
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  will-change: transform;
`;

const translateX = 0;

function TabListBorder({ ...rest }) {
  console.log(rest);
  return <Border style={{ transform: `translateX(${translateX}px)` }} />;
}

TabListBorder.defaultProps = {};

TabListBorder.propTypes = {};

export default TabListBorder;
