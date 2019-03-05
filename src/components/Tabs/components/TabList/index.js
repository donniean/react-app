import React, { Children, cloneElement, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TabList as ReactTabList } from 'react-tabs';
import { withSize } from 'react-sizeme';
import Measure from 'react-measure';

import useAnimation from '../../hooks/useAnimation';

const a = [
  80.1875,
  77.578125,
  89.125,
  99.578125,
  110.359375,
  118.359375,
  129.71875,
  133.9375,
  149.671875,
  159.375
];
let sum = a.reduce((p, c) => p + c);
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
    if (width > 0) {
      widthList[index] = width;
      const newWidthList = Object.assign([], widthList);
      setWidthList(newWidthList);
    }
  }

  function getAllWidth() {
    const allWidth =
      widthList.length > 0 ? widthList.reduce((p, c) => p + c) : 0;
  }

  function handleSize({ index, width }) {
    setWidth({ index, width });
  }

  useEffect(() => {});

  console.log(
    widthList,
    widthList.length > 0 ? widthList.reduce((p, c) => p + c) : 0
  );

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
            onSize: ({ width }) => {
              handleSize({ index, width });
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
