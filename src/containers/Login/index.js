import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import DocumentTitle from '../../components/DocumentTitle';

import { colorPrimary } from '../../assets/styles/variables';
import { vw } from '../../assets/styles/helpers';

import logo from '../../assets/images/logo.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  margin-top: ${vw(48)};
  width: ${vw(180)};
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

function Login() {
  return (
    <Container>
      <DocumentTitle>Login</DocumentTitle>
      <Image src={logo} />
      <Title>Login</Title>
      <Button>Login</Button>
    </Container>
  );
}

export default Login;
