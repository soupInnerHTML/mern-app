import React, { useContext, useState } from "react"
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import Paper from "@material-ui/core/Paper";
import Error from "../Common/Error";
import cs from "classnames"
import Typography from "@material-ui/core/Typography";
import { Fab, makeStyles } from "@material-ui/core";
import { useHttp } from "../../hooks/useHttp";
import { AuthContext } from "../../context/AuthContext";

const OFFSET_UPDATE_Y = 9
const OFFSET_DELETE_Y = 3
const OFFSET_X = 10

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: "6px 16px",
    },
    icon: {
        position: "absolute",
        animation: "fadeInBottom",
    },
    deleteFromLeft: {
        bottom: theme.spacing(OFFSET_X),
        right: theme.spacing(OFFSET_DELETE_Y),
    },
    deleteFromRight: {
        bottom: theme.spacing(OFFSET_X),
        left: theme.spacing(OFFSET_DELETE_Y),
    },
    updateFromLeft: {
        bottom: theme.spacing(OFFSET_X),
        right: theme.spacing(OFFSET_UPDATE_Y),
    },
    updateFromRight: {
        bottom: theme.spacing(OFFSET_X),
        left: theme.spacing(OFFSET_UPDATE_Y),
    },
}));


export default function Todo({ todo, todos, icons, order, setTodos, }) {

    let tailTheme = todos[order + 1]?.theme
    const classes = useStyles();
    const { request, error, clearError, } = useHttp()
    const auth = useContext(AuthContext)

    const deleteTodo = async () => {
        try {
            await request("api/todo/" + todo._id, "DELETE", null,  {
                Authorization: `Bearer ${auth.token}`,
            } )

            setTodos(todos.filter(todoToDelete => todoToDelete._id !== todo._id ))


        }
        catch (e) {
            // console.log(e.message)
        }
        
    }

    const [hover, setHover] = useState(false)

    return (
        <TimelineItem onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
            <TimelineOppositeContent>
                <Typography variant="body2" color="textSecondary">
                    { todo.time }
                </Typography>
            </TimelineOppositeContent>

            <TimelineSeparator>
                <TimelineDot color={ todo.theme === "disabled" ? undefined : todo.theme } variant={ !!todo.variant ? "outlined" : undefined }>
                    { icons.todos[todo.icon]() }
                </TimelineDot>
                { order + 1 < todos.length && <TimelineConnector className={ classes[tailTheme] } /> }
            </TimelineSeparator>

            <TimelineContent>
                <Paper elevation={ 3 } className={ classes.paper }>
                    <Typography variant="h6" component="h1">
                        { todo.label }
                    </Typography>

                    <Typography>{ todo.desc }</Typography>
                </Paper>
            </TimelineContent>

            { true && <>
                <Fab size="small" color="secondary" className={ cs(order % 2 ? classes.deleteFromLeft : classes.deleteFromRight, classes.icon) }>
                    { icons.delete({ onClick: () => deleteTodo(), }) }
                </Fab>
                <Fab size="small" color="primary" className={ cs(order % 2 ? classes.updateFromLeft : classes.updateFromRight, classes.icon) }>
                    { icons.update({ onClick: () => {}, }) }
                </Fab>
            </> }

            <Error { ...{ error, clearError, } }></Error>
        </TimelineItem>
    )
}
