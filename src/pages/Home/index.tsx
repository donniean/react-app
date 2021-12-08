import React from 'react';

import { Image, Title, Wrapper } from './index.styled';

import '@/pages/b.scss';
import logo from '@/assets/images/logo.svg';

console.log(logo);

function Home(): JSX.Element {
  return (
    <Wrapper>
      <Image src={logo} />
      <Title>Hello React</Title>
    </Wrapper>
  );
}

export default Home;
