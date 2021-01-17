import React, { Component } from "react";
import { connect } from "react-redux";
import { setError } from "../../../redux/reducers/errorReducer";
import Todo from "./Todo";
import { deleteTodoTC, setTodoToEdit } from "../../../redux/reducers/todosReducer";

class TodoContainer extends Component {
    render() {
        const { props, } = this
        
        return (
            <Todo { ...props }/>
        );
    }
}


export default connect(null, { setError, deleteTodoTC, setTodoToEdit, })(TodoContainer)