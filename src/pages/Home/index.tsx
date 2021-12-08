import React from 'react';

import { Image, Title, Wrapper } from './index.styled';

import logo from '@/assets/images/logo.svg';

function Home(): JSX.Element {
  return (
    <Wrapper>
      <Image src={logo} />
      <Title>Hello React</Title>
    </Wrapper>
  );
}

export default Home;
