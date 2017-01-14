import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, hashHistory } from "react-router";
import App from "./App.jsx";

ReactDOM.render(
    <Router history={hashHistory}>
        <Router path="/" component={App}></Router>
        <Router path="/:activeStatus" component={App}></Router>
    </Router>,
    document.getElementById("root")
);