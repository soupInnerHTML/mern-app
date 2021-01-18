import React, { Component } from "react";
import FormAddTodo from "./FormAddTodo";
import { addTodosTC, editTodoTC, setTodoToEdit } from "../../../redux/reducers/todosReducer";
import { connect } from "react-redux"
import { getIcons, getThemes, getTodoToEdit } from "../../../redux/selectors";

class FormAddTodoContainer extends Component {
    render() {
        const { props, } = this
        return (
            <FormAddTodo { ...props }></FormAddTodo>
        );
    }
}

let mapStateToProps = state => ({
    todoToEdit: getTodoToEdit(state),
    icons: getIcons(state),
    themes: getThemes(state),
})

let mapDispatchToProps = {
    addTodosTC, editTodoTC, setTodoToEdit,
}

export default connect(mapStateToProps, mapDispatchToProps)(FormAddTodoContainer)