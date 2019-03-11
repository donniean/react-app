import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import sizeMe from 'react-sizeme';

import { Context } from '../../context';

const StyleTab = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  padding: 10px;
`;

function getColor({ index, activeIndex, activeColor }) {
  const color = index === activeIndex ? activeColor : '';
  console.log(index);
  return color;
}

function Tab({ index, children, ...rest }) {
  const ref = useRef(null);
  console.log(index, ref, ref && ref.current && ref.current.clientWidth);

  return (
    <StyleTab ref={ref} {...rest}>
      {children}
    </StyleTab>
  );
}

Tab.defaultProps = {
  activeIndex: 0
};

Tab.propTypes = {
  index: PropTypes.number.isRequired,
  activeIndex: PropTypes.number,
  children: PropTypes.node
};

export default sizeMe()(Tab);
