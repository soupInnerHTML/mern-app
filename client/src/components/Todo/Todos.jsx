import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Fab } from "@material-ui/core";
import { IconsContext } from "../../context/IconsContext"
import Paper from "@material-ui/core/Paper";
import Profile from "../Common/Profile";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import Typography from "@material-ui/core/Typography";
import getId from "lodash/uniqueId"
import ModalAddTodo from "./ModalAddTodo";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: "6px 16px",
    },
    absolute: {
        position: "absolute",
        bottom: theme.spacing(2),
        right: theme.spacing(3),
    },
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
}));

export default function Todos() {
    const [ isOpenModal, setOpenModal] = useState(false)
    console.log(isOpenModal)

    const classes = useStyles();
    const icons = useContext(IconsContext)

    
    const [todos, setTodos] = useState([
        {
            id: getId(),
            time: "9:30 am",
            icon: "burger",
            label: "Eat",
            desc: "Because you need strength",
        },
        {
            id: getId(),
            time: "10:00 am",
            icon: "laptop",
            label: "Code",
            desc: "Because it's awesome!",
            theme: "primary",
        },
        {
            id: getId(),
            time: "10:30 am",
            icon: "hotel",
            label: "Sleep",
            desc: "Because you need rest",
            theme: "primary",
            variant: "outlined",
        },
        {
            id: getId(),
            time: "11:30 am",
            icon: "repeat",
            label: "Repeat",
            desc: "Because this is the life you love!",
            theme: "secondary",
        }
    ])

    const addTodo = (data) => {
        setTodos([...todos, { id: getId(), ...data, }])
    }

    return (
        <Timeline align="alternate" >
            <>
                <Profile></Profile>
                {
                    todos.map((todo, i) => {

                        let tailTheme = todos[i + 1]?.theme

                        return (

                            <TimelineItem key={ todo.id }>
                                <TimelineOppositeContent>
                                    <Typography variant="body2" color="textSecondary">
                                        { todo.time }
                                    </Typography>
                                </TimelineOppositeContent>

                                <TimelineSeparator>
                                    <TimelineDot color={ todo.theme === "disabled" ? undefined : todo.theme } variant={ !!todo.variant ? "outlined" : undefined }>
                                        { icons.todos[todo.icon]() }
                                    </TimelineDot>
                                    { i + 1 < todos.length && <TimelineConnector className={ classes[tailTheme] } /> }
                                </TimelineSeparator>

                                <TimelineContent>
                                    <Paper elevation={ 3 } className={ classes.paper }>
                                        <Typography variant="h6" component="h1">
                                            { todo.label }
                                        </Typography>

                                        <Typography>{ todo.desc }</Typography>
                                    </Paper>
                                </TimelineContent>
                            </TimelineItem>
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
