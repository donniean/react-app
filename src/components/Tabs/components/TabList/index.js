import React, { Children, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TabList as ReactTabList } from 'react-tabs';

import useAnimation from '../../hooks/useAnimation';

const Container = styled.div`
  overflow-x: hidden;
`;

const StyledTabList = styled(ReactTabList)`
  display: flex;
  margin: 0;
  padding: 0;

  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  will-change: transform;
`;

function TabList({ children, ...rest }) {
  const count = Children.count(children);
  const minTranslateX = -(count - 4) * (screen.width / 4);
  const { handlers, translateX } = useAnimation({ minTranslateX });

  return (
    <Container>
      <StyledTabList
        style={{ transform: `translate(${translateX}px, 0)` }}
        {...handlers}
        {...rest}
      >
        {children}
      </StyledTabList>
    </Container>
  );
}

TabList.tabsRole = 'TabList';

TabList.defaultProps = {};

TabList.propTypes = {};

export default TabList;
