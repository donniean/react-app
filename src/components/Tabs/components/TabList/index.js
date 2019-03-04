import React, { Children, cloneElement, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TabList as ReactTabList } from 'react-tabs';
import { withSize } from 'react-sizeme';
import Measure from 'react-measure';

import useAnimation from '../../hooks/useAnimation';

const a = [
  { k: '.$0', width: 80.1875 },
  { k: '.$1', width: 87.15625 },
  { k: '.$2', width: 79.78125 },
  { k: '.$3', width: 80.140625 },
  { k: '.$4', width: 80.40625 },
  { k: '.$5', width: 98.703125 },
  { k: '.$6', width: 80.3125 },
  { k: '.$7', width: 79.234375 },
  { k: '.$8', width: 80.328125 },
  { k: '.$9', width: 80.3125 }
];
let sum = a.reduce((p, c) => p.width + c.width);

sum = 0;
a.forEach(({ width }) => {
  sum += width;
});
console.log(sum);

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

function TabList({ size, children, ...rest }) {
  const [widthList, setWidthList] = useState([]);
  const [minTranslateX, setMinTranslateX] = useState(0);
  const { handlers, translateX } = useAnimation({ minTranslateX });

  function setWidth({ index, width }) {
    // console.log('TabList', index, width, widthList);
    const newWidthList = Object.assign([], widthList);
    if (width > 0) {
      newWidthList[index] = width;
      setWidthList(newWidthList);
    }
  }

  function onSize(index, { width }) {
    console.log(arguments);
    setWidthList([width]);
  }

  console.log(widthList);

  useEffect(() => {
    // console.log(widthList);
  });

  return (
    <Container>
      <StyledTabList
        style={{ transform: `translate(${translateX}px, 0)` }}
        {...handlers}
        {...rest}
      >
        {Children.map(children, (child, index) =>
          cloneElement(child, {
            index,
            setWidth,
            onSize: index => {
              console.log(index);
            }
          })
        )}
      </StyledTabList>
    </Container>
  );
}

TabList.tabsRole = 'TabList';

TabList.defaultProps = {};

TabList.propTypes = {};

export default withSize()(TabList);
