import React, { useEffect, useRef, useState } from "react"
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
import { Fab, Icon, makeStyles } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { connect } from "react-redux";
import { setError } from "../../../redux/reducers/errorReducer";
import { deleteTodoTC, setCurrentTodo } from "../../../redux/reducers/todosReducer";
import { setIsReady } from "../../../redux/reducers/authReducer";

const useStyles = makeStyles((theme) => ({
    primary: {
        backgroundColor: theme.palette.primary.main,
    },
    secondary: {
        backgroundColor: theme.palette.secondary.main,
    },
}));

const Todo = ({ todo, todos, icons, order, deleteTodoTC, setCurrentTodo, setIsReady, }) => {
    const blurRef = useRef(null)

    let tailTheme = todos[order + 1]?.theme
    const material = useStyles();
    const [action, setAction] = useState("edit")

    const [ isOpenModal, setOpenModal] = useState(false)
    const [ isBlur, setIsBlur] = useState(true)

    const deleteTodo = async () => {
        setIsReady(false)
        setIsBlur(false)
        setTimeout(() => setIsBlur(true), 1000)

        setHover(true)
        deleteTodoTC(todo._id)
    }

    const editTodo = () => {
        setAction("edit")
        setIsBlur(false)
        setOpenModal(true)
        setCurrentTodo(todo)
        setTimeout(() => setIsBlur(true), 1000)
    }

    const copyTodo = () => {
        setAction("copy")
        setOpenModal(true)
        setCurrentTodo(todo)
    }

    const [hover, setHover] = useState(false)
    const [animSwitch, setAnimSwitch] = useState("hide")

    const toggleHover = () => {
        !hover ? setAnimSwitch("slideInUp") : setAnimSwitch("slideOutDown")
        setHover(!hover)
    }

    useEffect(() => {
        blurRef.current.onblur = () => {
            console.log(isBlur)
            if (isBlur) {
                console.log(blurRef)
                setAnimSwitch("slideOutDown")
                setHover(false)
            }
        }
    }, [isBlur])


    return (
        <TimelineItem className={ cs(css.todo, "bounceIn") }>
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


            <div className={ css.handlers }>
                <div className={ cs(animSwitch, css.actions) }>
                    <Fab
                        size="small"
                        color="secondary"
                        className={ css.iconHandle }
                        onClick={ deleteTodo }
                    >
                        <Icon>delete</Icon>
                    </Fab>
                    <Fab
                        size="small"
                        color="primary"
                        className={ css.iconHandle }
                        onClick={ editTodo }
                    >
                        <Icon>edit</Icon>
                    </Fab>
                    <Fab
                        size="small"
                        style={ { color: "#fff", background: "#9C27B0", } }
                        className={ css.iconHandle }
                        onClick={ copyTodo }
                    >
                        <Icon>insert_drive_file</Icon>
                    </Fab>
                </div>

                <MoreVertIcon
                    ref={ blurRef }
                    className={ cs(css.more, css.iconHandle) }
                    onClick={ toggleHover }
                />
            </div>


            <ModalAddTodo { ...{ isOpenModal, setOpenModal, action, } }/>
        </TimelineItem>
    )
}

const mapDispatchToProps = {
    setError, deleteTodoTC, setCurrentTodo, setIsReady,
}


export default connect(null, mapDispatchToProps)(Todo)