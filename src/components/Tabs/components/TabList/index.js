import React, {
  Children,
  cloneElement,
  useState,
  useEffect,
  useRef
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import sizeMe, { SizeMe, withSize } from 'react-sizeme';

import useAnimation from '../../hooks/useAnimation';

const Container = styled.div`
  overflow-x: hidden;
`;

function TabListContainer() {
  return <SizeMe>{({ width }) => <Container width={width} />}</SizeMe>;
}

const StyledTabList = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;

  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  will-change: transform;
`;

function TabList({ size, children, ...rest }) {
  const [widthList, setWidthList] = useState([]);
  // const [minTranslateX, setMinTranslateX] = useState(0);
  // const { handlers, translateX } = useAnimation({ minTranslateX });

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

  useEffect(() => {});

  const ref = useRef(null);

  const minTranslateX =
    widthList.length > 0
      ? ref.current.clientWidth - widthList.reduce((p, c) => p + c)
      : 0;
  const { handlers, translateX } = useAnimation({ minTranslateX });

  console.log(ref);

  return (
    <Container ref={ref}>
      <StyledTabList
        style={{ transform: `translateX(${translateX}px)` }}
        {...handlers}
        {...rest}
      >
        {Children.map(children, (child, index) =>
          cloneElement(child, {
            // onSize: ({ width }) => {
            //   handleSize({ index, width });
            // }
          })
        )}
      </StyledTabList>
    </Container>
  );
}

TabList.defaultProps = {};

TabList.propTypes = {};

export default TabList;
