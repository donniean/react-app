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

  transition: transform 0.3s cubic-bezier(0.35, 0, 0.25, 1);
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
  const minX = -(count - 4) * (screen.width / 4);

  const [translateX, setTranslateX] = useState(0);

  function handleSwiping(eventData) {
    console.log(eventData);
    const { dir, deltaX } = eventData;
    setTranslateX(prevTranslateX => {
      const newTranslateX = prevTranslateX - deltaX / 5;
      if (dir === 'Left') {
        if (translateX > minX) {
          return newTranslateX;
        } else {
          return minX;
        }
      } else if (dir === 'Right') {
        if (translateX < 0) {
          return newTranslateX;
        } else {
          return 0;
        }
      }
    });
  }

  function handleSwiped(eventData) {
    console.log(eventData);
    const { deltaX } = eventData;
    if (translateX <= 0) {
      setTranslateX(prevTranslateX => prevTranslateX - 10);
    }
  }

  const handlers = useSwipeable({
    onSwiping: handleSwiping
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
