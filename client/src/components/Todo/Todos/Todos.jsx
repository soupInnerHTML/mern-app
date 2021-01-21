import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import Timeline from "@material-ui/lab/Timeline";
import ModalAddTodo from "../Modal/ModalAddTodo";
import css from "./Todos.module.css"
import ProfileContainer from "../../Common/Profile/ProfileContainer";
import AddBtn from "../../Common/AddBtn";
import Todo from "../Todo/Todo";
import { connect } from "react-redux";
import { getIcons, getIsReady, getTodosData } from "../../../redux/selectors";
import { getTodosTC, setTodos, setOpenModal } from "../../../redux/reducers/todosReducer";


function Todos({ todos, setTodos, getTodosTC, icons, setOpenModal, }) {
    const action = "add"

    const { token, } = useAuth()


    const getTodos = useCallback(() => {
        if (token) {
            getTodosTC()
        }
    }, [token])

    useEffect(getTodos, [getTodos])

    return (
        <Timeline align="alternate" className={ css.tree }>
            <ProfileContainer link="Bookmarks"/>
            {
                todos.map((todo, order) => {
                    return (
                        <Todo key={ todo._id } { ...{ todo, todos, icons, order, setTodos, token, } }/>
                    )
                })
            }

            <AddBtn onClick={ () => setOpenModal(true) }/>

            <ModalAddTodo { ...{ action, } }/>

        </Timeline>

    );
}

let mapStateToProps = state => ({
    todos: getTodosData(state),
    icons: getIcons(state),
    isReady: getIsReady(state),
})

let mapDispatchToProps = {
    setTodos, getTodosTC, setOpenModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
