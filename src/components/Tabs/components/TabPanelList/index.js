import React, { Children, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSwipeable } from 'react-swipeable';

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

  const [translateX, setTranslateX] = useState(0);
  const [lastTranslateX, setLastTranslateX] = useState(translateX);

  function getNewTranslateX({ dir, deltaX }) {
    const computedTranslateX = lastTranslateX - deltaX;
    let newTranslateX = 0;
    if (dir === 'Left') {
      if (computedTranslateX > minTranslateX) {
        newTranslateX = computedTranslateX;
      } else {
        newTranslateX = minTranslateX;
      }
    } else if (dir === 'Right') {
      if (computedTranslateX < 0) {
        newTranslateX = computedTranslateX;
      } else {
        newTranslateX = 0;
      }
    }
    return newTranslateX;
  }

  function handleSwiping(eventData) {
    const { dir, deltaX } = eventData;
    console.log('swiping', deltaX);
    const newTranslateX = getNewTranslateX({ dir, deltaX });
    setTranslateX(newTranslateX);
  }

  function handleSwiped(eventData) {
    const { dir, deltaX } = eventData;
    console.log('swiped', deltaX);
    if (['Left', 'Right'].includes(dir)) {
      const newTranslateX = getNewTranslateX({ dir, deltaX });
      setLastTranslateX(newTranslateX);
    }
  }

  const handlers = useSwipeable({
    onSwiping: handleSwiping,
    onSwiped: handleSwiped
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

export default TabPanelList;
