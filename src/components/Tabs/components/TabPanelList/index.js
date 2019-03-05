import React, { Children, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import useAnimation from '../../hooks/useAnimation';

const Container = styled.div`
  overflow-x: hidden;
`;

const List = styled.div`
  display: flex;
  margin: 0;
  padding: 0;

  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  will-change: transform;
`;

function TabPanelList({ children, ...rest }) {
  const count = Children.count(children);
  const ref = useRef(null);
  const containerWidth = ref && ref.current && ref.current.clientWidth;
  const minTranslateX = -(count - 1) * 100;
  const { handlers, translateX, lastTranslateX } = useAnimation({
    minTranslateX
  });

  return (
    <Container ref={ref}>
      <List
        style={{ transform: `translate(${translateX}%, 0)` }}
        {...handlers}
        {...rest}
      >
        {children}
      </List>
    </Container>
  );
}

TabPanelList.defaultProps = {};

TabPanelList.propTypes = {};

export default TabPanelList;
