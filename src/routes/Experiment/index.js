import React, { useState, Children } from 'react';
import styled from 'styled-components';

import { vw } from '../../styles/helpers';

import Page from '../../components/Page';
import FlexCol from '../../components/FlexCol';

import { useSwipeable } from 'react-swipeable';
import { Tab, TabList, Tabs, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const Container = styled.div`
  overflow-x: hidden;
`;

const StyleTabList = styled(TabList)`
  display: flex;
  margin: 0;
  padding: 0;

  /* transition: transform 0.3s ease; */
  transition: transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1);
  will-change: transform;
`;

const StyleTab = styled(Tab)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 25%;
  padding: 20px;
`;

function MyTabList({ children }) {
  const count = Children.count(children);
  const minTranslateX = -(count - 4) * (screen.width / 4);

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
      // setTranslateX(newTranslateX);
      setLastTranslateX(newTranslateX);
    }
  }

  const handlers = useSwipeable({
    onSwiping: handleSwiping,
    onSwiped: handleSwiped
    // onSwipedLeft: handleSwiped,
    // onSwipedRight: handleSwiped
  });

  return (
    <Container>
      <StyleTabList
        {...handlers}
        style={{ transform: `translate(${translateX}px, 0)` }}
      >
        {children}
      </StyleTabList>
    </Container>
  );
}

MyTabList.tabsRole = 'TabList';

function MyTab({ children }) {
  return <StyleTab>{children}</StyleTab>;
}

MyTab.tabsRole = 'Tab';

function Experiment({ documentTitle }) {
  return (
    <Page documentTitle={documentTitle}>
      <Tabs>
        <MyTabList>
          {list.map((value, index) => (
            <MyTab key={index}>Tab {value}</MyTab>
          ))}
        </MyTabList>

        {list.map((value, index) => (
          <TabPanel key={index}>
            <h2>TabPanel {value}</h2>
          </TabPanel>
        ))}
      </Tabs>
    </Page>
  );
}

export default Experiment;
