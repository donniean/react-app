import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Context, Provider } from '../../context';

const StyledTabs = styled.div`
  display: flex;
  flex-direction: column;
`;

function Tabs({ defaultIndex, children, ...rest }) {
  return (
    <Provider defaultIndex={defaultIndex} {...rest}>
      <StyledTabs>{children}</StyledTabs>
    </Provider>
  );
}

Tabs.defaultProps = {
  defaultIndex: 0,
  activeColor: '#61dafb'
};

Tabs.propTypes = {
  defaultIndex: PropTypes.number,
  activeColor: PropTypes.string,
  children: PropTypes.node
};

export default Tabs;
