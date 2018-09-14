import React from 'react';
import { hot } from 'react-hot-loader';
import styled from 'styled-components';

import GlobalStyle from './assets/styles/GlobalStyle';

import logo from './assets/images/logo.png';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10vw;
`;

const Title = styled.h1`
    font-size: 10vw;
    color: #61dafb;
`;

const Image = styled.img`
    width: 20vw;
`;

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <GlobalStyle />
                <Image src={logo} />
                <Title>Hello React</Title>
            </Container>
        );
    }
}

export default hot(module)(App);
