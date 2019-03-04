import React, { Children, cloneElement, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TabList as ReactTabList } from 'react-tabs';
import findIndex from 'lodash/findIndex';
import { SizeMe } from 'react-sizeme';

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
  let index = 0;
  let widthList = [];
  const [minTranslateX, setMinTranslateX] = useState(0);
  const { handlers, translateX } = useAnimation({ minTranslateX });

  useEffect(() => {
    console.log(widthList);
    for (const key of widthList) {
      const value = widthList[key];
      console.log(value);
    }
    // const allWidth = widthList.reduce(
    //   (previousValue, currentValue) => previousValue + currentValue
    // );
    // console.log(allWidth);
  });

  return (
    <Container>
      <StyledTabList
        style={{ transform: `translate(${translateX}px, 0)` }}
        {...handlers}
        {...rest}
      >
        {Children.map(children, child => (
          <SizeMe>
            {({ size }) => {
              console.log(child);
              const { key } = child;
              const { width } = size;
              const i = findIndex(widthList, { key });
              widthList[index++] = {
                key,
                width
              };
              return child;
            }}
          </SizeMe>
        ))}
      </StyledTabList>
    </Container>
  );
}

TabList.tabsRole = 'TabList';

TabList.defaultProps = {};

TabList.propTypes = {};

export default TabList;
