import React, { useState } from 'react';
import styled from 'styled-components';

import DocumentTitle from '../../components/DocumentTitle';

import { colorPrimary } from '../../assets/styles/variables';
import { vw } from '../../assets/styles/helpers';
import logo from '../../assets/images/logo.png';

import request from '../../utils/request';

(async function() {
  const a = await fetch('https://www.baidu.com/', { method: 'GET' });
})();

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

function Home() {
  return (
    <Container>
      <DocumentTitle>Hello React</DocumentTitle>
      <Image src={logo} />
      <Title>Hello React</Title>
    </Container>
  );
}

export default Home;
