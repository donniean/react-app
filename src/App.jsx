import React from 'react';
import { hot } from 'react-hot-loader';

import './sass/App.scss';
import logo from './images/logo.png';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1 className="title">Hello React</h1>
                <img src={logo} />
            </div>
        );
    }
}

export default hot(module)(App);
