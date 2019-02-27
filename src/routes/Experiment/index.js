import React, { useState } from 'react';
import styled from 'styled-components';

import { vw } from '../../styles/helpers';

import Page from '../../components/Page';
import FlexCol from '../../components/FlexCol';

const Wrapper = styled(FlexCol)`
  justify-content: center;
  align-items: center;
  padding: ${vw(32)};
`;

const Title = styled.h1`
  margin-top: ${vw(36)};
  font-size: ${vw(64)};
  color: ${props => props.theme.color.primary};
`;

function Experiment({ documentTitle }) {
  return (
    <Page documentTitle={documentTitle}>
      <Wrapper>
        <Title>Experiment</Title>
      </Wrapper>
    </Page>
  );
}

export default Experiment;
