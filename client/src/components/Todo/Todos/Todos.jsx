import React, { useCallback, useContext, useEffect, useState } from "react";
import { IconsContext } from "../../../context/IconsContext"
import { useHttp } from "../../../hooks/useHttp";
import Timeline from "@material-ui/lab/Timeline";
import ModalAddTodo from "../Modal/ModalAddTodo";
import css from "./Todos.module.css"
import ProfileContainer from "../../Common/Profile/ProfileContainer";
import TodoContainer from "../Todo/TodoContainer";
import { useAuth } from "../../../hooks/useAuth";
import { CircularProgress, Container, Fab } from "@material-ui/core";


export default function Todos({ todos, setTodos, getTodosTC, isReady, }) {
    const action = "add"

    const [isOpenModal, setOpenModal] = useState(false)
    const { request, } = useHttp()

    const { logout, token, } = useAuth()
    const icons = useContext(IconsContext)


    const getTodos = useCallback(async () => {
        if (token) {
            await getTodosTC(request, token, logout)
        }
    }, [request, token])

    useEffect(getTodos, [getTodos])

    return (
        <Timeline align="alternate" className={ css.tree }>
            <ProfileContainer/>
            {
                todos.map((todo, order) => {
                    return (
                        <TodoContainer key={ todo._id } { ...{ todo, todos, icons, order, setTodos, token, } }/>
                    )
                })
            }
            <Fab color="secondary" className={ css.addContainer }>
                { icons.add({ onClick: () => setOpenModal(true), className: css.addTodo, }) }
            </Fab>

            <ModalAddTodo { ...{ isOpenModal, setOpenModal, action, } }/>

        </Timeline>

    );
}
