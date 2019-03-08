import React, { Children, cloneElement, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SwipeableViews from 'react-swipeable-views';

import useAnimation from '../../hooks/useAnimation';
import TabListBorder from '../TabListBorder';

const Container = styled.div`
  overflow-x: hidden;
`;

const List = styled.ul`
  position: relative;
  display: flex;
  margin: 0;
  padding: 0;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  will-change: transform;
`;

function TabList({ activeColor, children, ...rest }) {
  const [widthList, setWidthList] = useState([]);
  const ref = useRef(null);

  function setWidth({ index, width }) {
    if (width > 0) {
      widthList[index] = width;
      const newWidthList = Object.assign([], widthList);
      setWidthList(newWidthList);
    }
  }

  function handleSize({ index, width }) {
    setWidth({ index, width });
  }

  function getMinTranslateX() {
    let [minTranslateX, containerWidth, listWidth] = [0, 0, 0];
    const conditionRef = ref && ref.current;
    const conditionWidthList = widthList.length > 0;
    if (conditionRef) {
      containerWidth = ref.current.clientWidth;
    }
    if (conditionWidthList) {
      listWidth = widthList.reduce((p, c) => p + c);
    }
    if (conditionRef && conditionWidthList) {
      minTranslateX = containerWidth - listWidth;
    }
    return minTranslateX;
  }

  const minTranslateX = getMinTranslateX();
  const { handlers, translateX } = useAnimation({ minTranslateX });

  return (
    <Container ref={ref}>
      <List
        style={{ transform: `translateX(${translateX}px)` }}
        {...handlers}
        {...rest}
      >
        {Children.map(children, (child, index) =>
          cloneElement(child, {
            onSize: ({ width }) => {
              handleSize({ index, width });
            }
          })
        )}
        <TabListBorder color={activeColor} />
      </List>
    </Container>
  );
}

TabList.defaultProps = {};

TabList.propTypes = {
  activeColor: PropTypes.string,
  children: PropTypes.node
};

export default TabList;
