import React, { useContext, useEffect, useState } from "react"
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import Paper from "@material-ui/core/Paper";
import cs from "classnames"
import ModalAddTodo from "../ModalAddTodo";
import css from "./Todo.module.css"
import Typography from "@material-ui/core/Typography";
import { Fab, makeStyles } from "@material-ui/core";
import { useHttp } from "../../../hooks/useHttp";
import { AuthContext } from "../../../context/AuthContext";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
    primary: {
        backgroundColor: theme.palette.primary.main,
    },
    secondary: {
        backgroundColor: theme.palette.secondary.main,
    },
    interactive: {
        animation: "slideInUp 1s",
    },
}));

export default function Todo({ todo, todos, icons, order, setTodos, setError, token, deleteTodoTC, }) {

    let tailTheme = todos[order + 1]?.theme
    const material = useStyles();
    const { request, error, } = useHttp()
    const auth = useContext(AuthContext)
    const action = "edit"

    useEffect(() => {
        setError(error)
    }, [error])

    const [ isOpenModal, setOpenModal] = useState(false)

    const deleteTodo = async () => {
        try {
            deleteTodoTC(request, token, todo._id)
        }
        catch (e) {
            // console.log(e.message)
        }

    }

    const [hover, setHover] = useState(false)

    const toggleHover = () => {
        setHover(!hover)
    }

    const alternate = (action) => {
        return order % 2 ? css[action + "FromLeft"] : css[action + "FromRight"]
    }

    return (
        <TimelineItem>
            <TimelineOppositeContent>
                <Typography variant="body2" color="textSecondary">
                    { todo.time }
                </Typography>
            </TimelineOppositeContent>

            <TimelineSeparator>
                <TimelineDot color={ todo.theme === "disabled" ? undefined : todo.theme } variant={ !!todo.variant ? "outlined" : undefined }>
                    { icons.todos[todo.icon]() }
                </TimelineDot>
                { order + 1 < todos.length && <TimelineConnector className={ material[tailTheme] } /> }
            </TimelineSeparator>

            <TimelineContent>
                <Paper elevation={ 3 } className={ css.paper }>
                    <Typography variant="h6" component="h1">
                        { todo.label }
                    </Typography>

                    <Typography>{ todo.desc }</Typography>
                </Paper>
            </TimelineContent>

            { hover && <>
                <Fab size="small" color="secondary" className={ cs(alternate("delete" ), css.icon, material.interactive) }>
                    { icons.delete({ onClick: () => deleteTodo(), }) }
                </Fab>
                <Fab size="small" color="primary" className={ cs(alternate("update" ), css.icon, material.interactive) }>
                    { icons.update({ onClick: () => setOpenModal(true), }) }
                </Fab>
            </> }

            <MoreVertIcon className={ cs(css.icon, alternate("more" )) } onClick={ toggleHover }/>

            <ModalAddTodo { ...{ isOpenModal, setOpenModal, action, } }/>
        </TimelineItem>
    )
}
