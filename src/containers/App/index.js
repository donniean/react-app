import React from 'react';
import { hot } from 'react-hot-loader';
import styled from 'styled-components';

import { colorPrimary } from '../../assets/styles/variables';

import GlobalStyle from '../../components/GlobalStyle';

import logo from '../../assets/images/logo.png';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 10vw;
  color: ${colorPrimary};
`;

const Image = styled.img`
  margin-top: 10vw;
  width: 20vw;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AppWrapper>
        <GlobalStyle />
        <Image src={logo} />
        <Title>Hello React</Title>
      </AppWrapper>
    );
  }
}

export default hot(module)(App);
