import React, { useState } from 'react';
import styled from 'styled-components';

import Page from '../../components/Page';
import FlexWrapper from '../../components/FlexWrapper';

import { colorPrimary } from '../../styles/variables';
import { vw } from '../../styles/helpers';

import logo from '../../assets/images/logo.png';

function Home() {
  const Wrapper = styled(FlexWrapper)`
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
