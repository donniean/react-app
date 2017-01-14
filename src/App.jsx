import React from "react";
import Title from "./components/Title.jsx";
import Header from "./components/Header.jsx";
import List from "./components/List.jsx";
import Footer from "./components/Footer.jsx";
import store from "./store.js";
import "./style.css";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.addTodo = this.addTodo.bind(this);
        this.state = {
            todos: store.get()
        };
    }

    addTodo(todo) {
        let todos = this.state.todos;
        todo.id = Date.now();
        todos = todos.concat([todo]);
        this.setState({ todos: todos });
        store.add(todo);
    }

    render() {
        return (
            <div className="container">
                <Title />
                <div className="main">
                    <Header addTodo={this.addTodo} />
                    <List activeStatus={this.props.params.activeStatus} todos={this.state.todos} />
                    <Footer />
                </div>
            </div>
        );
    }
}

export default App;