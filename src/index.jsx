import React from "react";
import ReactDOM from "react-dom";
import Hello from "./hello.jsx";

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div id="app"><Hello /></div>;
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
);