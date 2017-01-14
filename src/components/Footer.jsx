import React from "react";
import { Link, IndexLink } from "react-router";
import "../style.css";

class Footer extends React.Component {
    render() {
        return (
            <div id="footer" className="footer">
                <span>
                    <span id="activeCount">0</span><span>&nbsp;items left</span>
                </span>
                <Link to="/" activeClassName="active" onlyActiveOnIndex={true}>All</Link>
                <Link to="/active" activeClassName="active">Active</Link>
                <Link to="/completed" activeClassName="active">Completed</Link>
                <button type="button" id="clearCompleted" className="clear-completed hide">Clear Completed</button>
            </div>
        );
    }
}

export default Footer;