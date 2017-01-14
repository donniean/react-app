import React from "react";
import "../style.css";

class List extends React.Component {
    render() {
        return (
            <div id="list" className="list">
                {
                    this.props.todos.map(
                        item => (
                            <div key={item.id} className="item">
                                <input type="checkbox" className="change-status" />
                                <label className="todo">{item.content}</label>
                                <input type="text" className="todo hide" />
                                <button type="button" className="delete">X</button>
                            </div>
                        )
                    )
                }
            </div>
        );
    }
}

export default List;