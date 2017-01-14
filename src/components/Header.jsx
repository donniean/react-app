import React from "react";
import "../style.css";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.state = {
            todo: {
                status: "active",
                content: ""
            }
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        const content = this.state.todo.content.trim();
        const todo = {
            status: "active",
            content: content
        };
        if(!content) {
            return false;
        }
        this.props.addTodo(todo);
        this.setState({
            todo: {
                status: "active",
                content: ""
            }
        });
    }

    handleContentChange(e) {
        this.setState({
            todo: {
                content: e.target.value
            }
        });
    }

    render() {
        return (
            <div className="header">
                <form id="addTodo" onSubmit={this.handleSubmit}>
                    <button type="button" id="allCompleted" className="all-completed">All Completed</button>
                    <input
                        type="text"
                        id="newTodo"
                        className="new-todo"
                        placeholder="What needs to be done?"
                        value={this.state.todo.content}
                        onChange={this.handleContentChange}
                        />
                </form>
            </div>
        );
    }
}

export default Header;