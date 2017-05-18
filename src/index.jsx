import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";

import "./sass/index.scss";

ReactDOM.render(
    <App />,
    document.getElementById("root")
);

module.hot && module.hot.accept();