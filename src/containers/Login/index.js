import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
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
  margin: ${vw(48)} 0;
  width: ${vw(180)};
`;

const Button = styled.button`
  border: 0;
  border-radius: ${vw(10)};
  padding: ${vw(20)};
  background-color: ${colorPrimary};
  color: #ffffff;
`;

function Login() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated')
  );

  const handleClick = () => {
    setIsAuthenticated(1);
  };

  useEffect(() => {
    console.log(isAuthenticated);
  });

  return (
    <Container>
      <DocumentTitle>Login</DocumentTitle>
      <Image src={logo} />
      <Button onClick={handleClick}>Login</Button>
    </Container>
  );
}

export default Login;
