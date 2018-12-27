import React from 'react';
import styled from 'styled-components';

import { colorPrimary } from '../../assets/styles/variables';
import { vw } from '../../assets/styles/helpers';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: ${vw(48)};
  color: ${colorPrimary};
`;

const Button = styled.button`
  border: 0;
  border-radius: ${vw(10)};
  padding: ${vw(20)};
  background-color: ${colorPrimary};
  color: #ffffff;
`;

function Home() {
  return (
    <Container>
      <Title>Home</Title>
      <Button>Logout</Button>
    </Container>
  );
}

export default Home;
