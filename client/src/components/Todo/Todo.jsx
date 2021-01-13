import React, { useState } from "react"
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { Fab, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: "6px 16px",
    },
    absolute: {
        position: "absolute",
        bottom: theme.spacing(2),
        right: theme.spacing(3),
    },
}));


export default function Todo({ todo, todos, icons, i, }) {

    let tailTheme = todos[i + 1]?.theme
    const classes = useStyles();

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

            { hover && <Fab color="secondary" className={ classes.absolute }>
                { icons.delete() }
            </Fab> }
        </TimelineItem>
    )
}
