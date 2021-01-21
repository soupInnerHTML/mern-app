import React, { Component } from "react";
import FormAddTodo from "./FormAddTodo";
import { addTodosTC, editTodoTC, setCurrentTodo } from "../../../redux/reducers/todosReducer";
import { connect } from "react-redux"
import { getIcons, getThemes, getCurrentTodo } from "../../../redux/selectors";

class FormAddTodoContainer extends Component {
    render() {
        const { props, } = this
        return (
            <FormAddTodo { ...props }></FormAddTodo>
        );
    }
}

let mapStateToProps = state => ({
    currentTodo: getCurrentTodo(state),
    icons: getIcons(state),
    themes: getThemes(state),
})

let mapDispatchToProps = {
    addTodosTC, editTodoTC, setCurrentTodo,
}

export default connect(mapStateToProps, mapDispatchToProps)(FormAddTodoContainer)