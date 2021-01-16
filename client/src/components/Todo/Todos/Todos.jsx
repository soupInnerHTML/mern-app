import React, { useCallback, useContext, useEffect, useState } from "react";
import { Fab } from "@material-ui/core";
import { IconsContext } from "../../../context/IconsContext"
import { AuthContext } from "../../../context/AuthContext"
import { useHttp } from "../../../hooks/useHttp";
import Timeline from "@material-ui/lab/Timeline";
import ModalAddTodo from "../ModalAddTodo";
import Todo from "../Todo/Todo";
import getId from "lodash/uniqueId"
import css from "./Todos.module.css"
import ProfileContainer from "../../Common/ProfileContainer";
import TodoContainer from "../Todo/TodoContainer";


export default function Todos({ todos, setTodos, getTodosTC, isAuth, }) {
    const action = "add"

    const [isOpenModal, setOpenModal] = useState(false)
    const { request, } = useHttp()

    const auth = useContext(AuthContext)
    const icons = useContext(IconsContext)


    const getTodos = useCallback(async () => {
        try {
            getTodosTC(request, isAuth)
        }
        catch (e) {
            if (e.message === "Нет авторизации") {
                try {
                    auth.logout()
                }
                catch (e) {
                    alert(e)
                }
            }
        }
    }, [request, isAuth])

    useEffect(() => getTodos(), [getTodos])

    return (
        <Timeline align="alternate" className={ css.tree }>
            <ProfileContainer/>
            {
                todos.map((todo, order) => {
                    return (
                        <TodoContainer key={ todo._id } { ...{ todo, todos, icons, order, setTodos, isAuth, } }/>
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
