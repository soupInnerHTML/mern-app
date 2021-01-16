import React, { Component } from "react";
import FormAddTodo from "./FormAddTodo";
import { addTodosTC, setTodos } from "../../redux/reducers/todosReducer";
import { connect } from "react-redux"

class FormAddTodoContainer extends Component {
    render() {
        const { props, } = this
        return (
            <FormAddTodo { ...props }></FormAddTodo>
        );
    }
}

export default connect(null, { setTodos, addTodosTC, })(FormAddTodoContainer)