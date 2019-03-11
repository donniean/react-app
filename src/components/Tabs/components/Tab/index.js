import React, { useContext } from 'react';
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
  color: ${props => console.log(props)};
`;

function Tab({ index, activeIndex, children, ...rest }) {
  const { activeColor } = useContext(Context);
  const color = index === activeIndex ? activeColor : '';

  const a = { color: 'red' };

  return (
    <StyleTab className={a} style={{ color }} {...rest}>
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
