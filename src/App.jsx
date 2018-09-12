import React from 'react';
import { hot } from 'react-hot-loader';
import styled from 'styled-components';

import './styles/App.scss';
import logo from './images/logo.png';

const Title = styled.h1`
    color: #61dafb;
`;

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Title>Hello React</Title>
                <img src={logo} />
            </div>
        );
    }
}

export default hot(module)(App);
