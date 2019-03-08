import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { vw } from '../../styles/helpers';

import Page from '../../components/Page';

import { Tabs, TabList, Tab, TabPanelList } from '../../components/Tabs';

const list = [0, 1, 22, 333, 4444, 55555, 666666, 7777777, 88888888, 999999999];

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
            <h2 key={index}>TabPanel {value}</h2>
          ))}
        </TabPanelList>
      </Tabs>
    </Page>
  );
}

Experiment.defaultProps = {};

Experiment.propTypes = {
  documentTitle: PropTypes.string
};

export default Experiment;
