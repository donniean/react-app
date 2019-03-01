import React from 'react';
import styled from 'styled-components';

import { vw } from '../../styles/helpers';

import Page from '../../components/Page';
import FlexCol from '../../components/FlexCol';

import {
  Tabs,
  TabList,
  Tab,
  TabPanelList,
  TabPanel
} from '../../components/Tabs';

const list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function Experiment({ documentTitle }) {
  return (
    <Page documentTitle={documentTitle}>
      <Tabs>
        <TabList>
          {list.map((value, index) => (
            <Tab key={index}>Tab {value}</Tab>
          ))}
        </TabList>

        <TabPanelList>
          {list.map((value, index) => (
            <TabPanel key={index} forceRender={true}>
              <h2>TabPanel {value}</h2>
            </TabPanel>
          ))}
        </TabPanelList>
      </Tabs>
    </Page>
  );
}

export default Experiment;
