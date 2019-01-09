import React, { useState } from 'react';
import styled from 'styled-components';

import Page from '../../components/Page';

import { colorPrimary } from '../../styles/variables';
import { vw } from '../../styles/helpers';

import logo from '../../assets/images/logo.png';

function Home() {
  const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: ${vw(32)};
  `;

  const Title = styled.h1`
    font-size: ${vw(64)};
    color: ${colorPrimary};
  `;

  const Image = styled.img`
    width: ${vw(256)};
    vertical-align: bottom;
  `;

  return (
    <Page title="Hello React">
      <Container>
        <Image src={logo} />
        <Title>Hello React</Title>
      </Container>
    </Page>
  );
}

export default Home;
