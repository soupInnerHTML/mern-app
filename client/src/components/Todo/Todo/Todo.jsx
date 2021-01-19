import React, { useContext, useEffect, useRef, useState } from "react"
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import Paper from "@material-ui/core/Paper";
import cs from "classnames"
import ModalAddTodo from "../Modal/ModalAddTodo";
import css from "./Todo.module.css"
import Typography from "@material-ui/core/Typography";
import { Fab, makeStyles } from "@material-ui/core";
import { useHttp } from "../../../hooks/useHttp";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
    primary: {
        backgroundColor: theme.palette.primary.main,
    },
    secondary: {
        backgroundColor: theme.palette.secondary.main,
    },
}));

export default function Todo({ todo, todos, icons, order, setTodos, setError, token, deleteTodoTC, setTodoToEdit, }) {
    const blurRef = useRef(null)

    let tailTheme = todos[order + 1]?.theme
    const material = useStyles();
    const { request, error, } = useHttp()
    const action = "edit"

    useEffect(() => {
        setError(error)
    }, [error])


    const [ isOpenModal, setOpenModal] = useState(false)
    const [ isBlur, setIsBlur] = useState(true)

    const deleteTodo = async () => {
        try {
            setIsBlur(false)
            setTimeout(() => setIsBlur(true), 1000)

            setHover(true)
            deleteTodoTC(request, token, todo._id)
        }
        catch (e) {
            // console.log(e.message)
        }

    }

    const editTodo = () => {
        setOpenModal(true)
        setTodoToEdit(todo)

        setIsBlur(false)

        setTimeout(() => setIsBlur(true), 1000)
    }

    const [hover, setHover] = useState(false)

    let [animSwitch, setAnimSwitch] = useState("hide")

    const toggleHover = () => {
        !hover ? setAnimSwitch("slideInUp") : setAnimSwitch("slideOutDown")
        setHover(!hover)
    }

    useEffect(() => {
        blurRef.current.onblur = () => {
            if (isBlur) {
                console.log(blurRef)
                setAnimSwitch(material.slideOutDown)
                setHover(false)
            }
        }
    }, [])

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
                    { icons[todo.icon]() }
                </TimelineDot>
                { order + 1 < todos.length && <TimelineConnector className={ material[tailTheme] } /> }
            </TimelineSeparator>

            <TimelineContent  style={ { zIndex: 5, } }>
                <Paper elevation={ 3 } className={ css.paper }>
                    <Typography variant="h6" component="h1">
                        { todo.label }
                    </Typography>

                    <Typography>{ todo.desc }</Typography>
                </Paper>
            </TimelineContent>


            <Fab size="small" color="secondary" className={ cs(alternate("delete" ), css.icon, animSwitch) }>
                { icons.delete({ onClick: deleteTodo, }) }
            </Fab>
            <Fab size="small" color="primary" className={ cs(alternate("update" ), css.icon, animSwitch) }>
                { icons.update({ onClick: editTodo, }) }
            </Fab>

            <MoreVertIcon
                style={ { zIndex: 6, } }
                className={ cs(css.icon, alternate("more" )) }
                onClick={ toggleHover }
                ref={ blurRef }
            />

            <ModalAddTodo { ...{ isOpenModal, setOpenModal, action, } }/>
        </TimelineItem>
    )
}
