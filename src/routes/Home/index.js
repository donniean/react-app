import React, { useState } from 'react';
import styled from 'styled-components';

import Page from '../../components/Page';
import FlexContainer from '../../components/FlexContainer';

import { colorPrimary } from '../../styles/variables';
import { vw } from '../../styles/helpers';

import logo from '../../assets/images/logo.png';

const Wrapper = styled(FlexContainer)`
  justify-content: center;
  align-items: center;
  padding: ${vw(32)};
`;

const Title = styled.h1`
  margin-top: ${vw(36)};
  font-size: ${vw(64)};
  color: ${colorPrimary};
`;

const Image = styled.img`
  width: ${vw(256)};
  vertical-align: bottom;
`;

function Home() {
  return (
    <Page title="Hello React">
      <Wrapper>
        <Image src={logo} />
        <Title>Hello React</Title>
      </Wrapper>
    </Page>
  );
}

export default Home;
