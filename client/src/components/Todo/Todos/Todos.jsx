import React, { useCallback, useEffect, useState } from "react";
import { useHttp } from "../../../hooks/useHttp";
import { useAuth } from "../../../hooks/useAuth";
import Timeline from "@material-ui/lab/Timeline";
import ModalAddTodo from "../Modal/ModalAddTodo";
import css from "./Todos.module.css"
import ProfileContainer from "../../Common/Profile/ProfileContainer";
import TodoContainer from "../Todo/TodoContainer";
import AddBtn from "../../Common/AddBtn";


export default function Todos({ todos, setTodos, getTodosTC, icons, }) {
    const action = "add"

    const [isOpenModal, setOpenModal] = useState(false)
    const { request, } = useHttp()

    const { token, } = useAuth()


    const getTodos = useCallback(() => {
        if (token) {
            getTodosTC(request)
        }
    }, [request, token])

    useEffect(getTodos, [getTodos])

    return (
        <Timeline align="alternate" className={ css.tree }>
            <ProfileContainer link="Bookmarks"/>
            {
                todos.map((todo, order) => {
                    return (
                        <TodoContainer key={ todo._id } { ...{ todo, todos, icons, order, setTodos, token, } }/>
                    )
                })
            }

            <AddBtn onClick={ () => setOpenModal(true) }/>

            <ModalAddTodo { ...{ isOpenModal, setOpenModal, action, } }/>

        </Timeline>

    );
}
