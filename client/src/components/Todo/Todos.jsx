import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Fab } from "@material-ui/core";
import { IconsContext } from "../../context/IconsContext"
import { useHttp } from "../../hooks/useHttp";
import { AuthContext } from "../../context/AuthContext"
import Timeline from "@material-ui/lab/Timeline";
import getId from "lodash/uniqueId"
import ModalAddTodo from "./ModalAddTodo";
import Profile from "../Common/Profile";
import Todo from "./Todo";

const useStyles = makeStyles((theme) => ({
    primary: {
        backgroundColor: theme.palette.primary.main,
    },
    secondary: {
        backgroundColor: theme.palette.secondary.main,
    },
    black: {
        backgroundColor: "#000",
    },
    addTodo: {
        width: 56,
        height: 56,
        padding: 15,
        cursor: "pointer",
        boxSizing: "border-box",
    },
    absolute: {
        position: "absolute",
        bottom: theme.spacing(2),
        right: theme.spacing(3),
    },
}));

export default function Todos() {
    const [ isOpenModal, setOpenModal] = useState(false)
    const { request, } = useHttp()
    const auth = useContext(AuthContext)

    const classes = useStyles();
    const icons = useContext(IconsContext)

    
    const [todos, setTodos] = useState([
        {
            _id: getId(),
            time: "9:30 am",
            icon: "burger",
            label: "Eat",
            desc: "Because you need strength",
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

    const addTodo = (data) => {
        setTodos({ _id: getId(), ...data, })
    }

    useEffect(() => {
        (async () => {
            let response = await request("/api/todo", "GET", null,  {
                Authorization: `Bearer ${auth.token}`,
            } )
            await setTodos([...todos, ...response])
        })()
    }, [])

    return (
        <Timeline align="alternate" >
            <>
                <Profile></Profile>
                {
                    todos.map((todo, i) => {
                        return (
                            <Todo key={ todo._id } { ...{ todo, classes, todos, icons, i, } }></Todo>
                        )
                    })
                }
                <Fab color="secondary" className={ classes.absolute }>
                    { icons.add({ onClick: () => setOpenModal(true), className: classes.addTodo, }) }
                </Fab>

                <ModalAddTodo { ...{ isOpenModal, setOpenModal, addTodo, } }></ModalAddTodo>

            </>

        </Timeline >
    );
}
