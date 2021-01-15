import React, { useCallback, useContext, useEffect, useState } from "react";
import { Fab } from "@material-ui/core";
import { IconsContext } from "../../../context/IconsContext"
import { AuthContext } from "../../../context/AuthContext"
import { TodosContext } from "../../../context/TodoContext";
import { useHttp } from "../../../hooks/useHttp";
import Timeline from "@material-ui/lab/Timeline";
import ModalAddTodo from "../ModalAddTodo";
import Profile from "../../Common/Profile";
import Todo from "../Todo/Todo";
import getId from "lodash/uniqueId"
import css from "./Todos.module.css"


export default function Todos() {
    const action = "add"

    const [isOpenModal, setOpenModal] = useState(false)
    const { request, } = useHttp()

    const auth = useContext(AuthContext)
    const icons = useContext(IconsContext)

    
    const [todos, setTodos] = useState([
        {
            _id: getId(),
            time: "9:30 am",
            icon: "burger",
            label: "Eat",
            desc: "Because you need strength.",
        },
        {
            _id: getId(),
            time: "10:00 am",
            icon: "laptop",
            label: "Code",
            desc: "Because it's awesome!",
            theme: "primary",
        },
        {
            _id: getId(),
            time: "10:30 am",
            icon: "hotel",
            theme: "primary",
            label: "Sleep",
            desc: "Because you need rest",
            variant: "outlined",
        },
        {
            _id: getId(),
            time: "11:30 am",
            icon: "repeat",
            label: "Repeat",
            desc: "Because this is the life you love!",
            theme: "secondary",
        }
    ])

    const getTodos = useCallback(async () => {
        try {
            let response = await request("/api/todo", "GET", null,  {
                Authorization: `Bearer ${auth.token}`,
            } )
            await setTodos([...todos, ...response])
        }
        catch (e) {
            
        }
    }, [request, auth.token])

    useEffect(() => getTodos(), [getTodos])

    return (
        <TodosContext.Provider value={ { todos, setTodos, } }>
            <Timeline align="alternate" className={ css.tree }>
                <Profile/>
                {
                    todos.map((todo, order) => {
                        return (
                            <Todo key={ todo._id } { ...{ todo, todos, icons, order, setTodos, } }/>
                        )
                    })
                }
                <Fab color="secondary" className={ css.addContainer }>
                    { icons.add({ onClick: () => setOpenModal(true), className: css.addTodo, }) }
                </Fab>

                <ModalAddTodo { ...{ isOpenModal, setOpenModal, action, } }/>
            </Timeline>
        </TodosContext.Provider>
    );
}
