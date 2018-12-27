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

const Title = styled.h1`
  font-size: 10vw;
  color: ${colorPrimary};
`;

const Image = styled.img`
  margin-top: 10vw;
  width: ${vw(180)};
`;

class Login extends PureComponent {
  render() {
    return (
      <Container>
        <DocumentTitle>登录</DocumentTitle>
        <Image src={logo} />
        <Title>Login</Title>
        <Link to="/home">Home</Link>
      </Container>
    );
  }
}

export default Login;
