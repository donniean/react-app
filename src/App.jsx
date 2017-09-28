import React from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                    </ul>
                    <ul>
                        <li><Link to="/about">About</Link></li>
                    </ul>
                    <ul>
                        <li><Link to="/topics">Topics</Link></li>
                    </ul>

                    <hr />

                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/topics" component={Topics} />
                </div>
            </Router>
        );
    }
}

const Home = () => (
    <div>
        <h2>Hello React Router</h2>
    </div>
);

const About = () => (
    <div>
        <h2>About</h2>
    </div>
);

const Topics = ({ match }) => (
    <div>
        <h2>Topics List</h2>
        <ul>
            <li>
                <Link to={`${match.url}/rendering`}>Rendering</Link>
            </li>
            <li>
                <Link to={`${match.url}/components`}>Components</Link>
            </li>
            <li>
                <Link to={`${match.url}/props-v-state`}>Props vs. State</Link>
            </li>
        </ul>

        <Route exact path={match.url} render={() => (
            <h3>Please choose a topic</h3>
        )} />
        <Route path={`${match.url}/:topicId`} component={Topic} />
    </div>
);

class Topic extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <h3>{this.props.match.params.topicId}</h3>
        );
    }
}

export default App;