import React, { Children, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import useAnimation from '../../hooks/useAnimation';

const Container = styled.div`
  overflow-x: hidden;
`;

const StyleTabPanelList = styled.div`
  display: flex;
  margin: 0;
  padding: 0;

  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  will-change: transform;
`;

function TabPanelList({ children, ...rest }) {
  const count = Children.count(children);
  const minTranslateX = -(count - 1) * screen.width;
  const { handlers, translateX, lastTranslateX } = useAnimation({
    minTranslateX
  });

  return (
    <Container>
      <StyleTabPanelList
        style={{ transform: `translate(${translateX}px, 0)` }}
        {...handlers}
        {...rest}
      >
        {children}
      </StyleTabPanelList>
    </Container>
  );
}

TabPanelList.defaultProps = {};

TabPanelList.propTypes = {};

export default TabPanelList;
