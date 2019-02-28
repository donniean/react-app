import React, { useState, Children } from 'react';
import styled from 'styled-components';

import { vw } from '../../styles/helpers';

import Page from '../../components/Page';
import FlexCol from '../../components/FlexCol';

import SwipeableViews from 'react-swipeable-views';
import { useSwipeable } from 'react-swipeable';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const Container = styled.div`
  overflow-x: hidden;
`;

const StyleTabs = styled(Tabs)`
  display: flex;
  flex-direction: column;
`;

const StyleTabList = styled(TabList)`
  display: flex;
  margin: 0;
  padding: 0;

  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
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

const StyleTabPanelList = styled.div`
  display: flex;
  margin: 0;
  padding: 0;

  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  will-change: transform;
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
      setLastTranslateX(newTranslateX);
    }
  }

  const handlers = useSwipeable({
    onSwiping: handleSwiping,
    onSwiped: handleSwiped
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

function MyTabPane({ children }) {
  return <StyleTab>{children}</StyleTab>;
}

function TabPanelList({ children }) {
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
        {...handlers}
        style={{ transform: `translate(${translateX}px, 0)` }}
      >
        {children}
      </StyleTabPanelList>
    </Container>
  );
}

MyTab.tabsRole = 'Tab';

function Experiment({ documentTitle }) {
  return (
    <Page documentTitle={documentTitle}>
      <StyleTabs>
        <MyTabList>
          {list.map((value, index) => (
            <MyTab key={index}>Tab {value}</MyTab>
          ))}
        </MyTabList>

        <TabPanelList>
          {list.map((value, index) => (
            <TabPanel key={index} forceRender={true}>
              <h2>TabPanel {value}</h2>
            </TabPanel>
          ))}
        </TabPanelList>
      </StyleTabs>
    </Page>
  );
}

export default Experiment;
