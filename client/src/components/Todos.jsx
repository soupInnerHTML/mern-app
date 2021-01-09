import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Fab } from "@material-ui/core";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import AddIcon from "@material-ui/icons/Add";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import HotelIcon from "@material-ui/icons/Hotel";
import RepeatIcon from "@material-ui/icons/Repeat";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

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
}));

export default function Todos() {
    const classes = useStyles();
    let [todos, setTodos] = useState([
        {
            time: "9:30 am",
            icon: <FastfoodIcon />,
            label: "Eat",
            desc: "Because you need strength",
        },
        {
            time: "10:00 am",
            icon: <LaptopMacIcon />,
            label: "Code",
            desc: "Because it's awesome!",
            theme: "primary",
        },
        {
            time: "10:30 am",
            icon: <HotelIcon />,
            label: "Sleep",
            desc: "Because you need rest",
            theme: "primary",
            variant: "outlined",
        },
        {
            time: "11:30 am",
            icon: <RepeatIcon />,
            label: "Repeat",
            desc: "Because this is the life you love!",
            theme: "secondary",
        }
    ])

    return (
        <Timeline align="alternate" >
            <>
                {
                    todos.map((todo, i) => {
                        let tailTheme = todos[i + 1]?.theme

                        return (

                            <TimelineItem>
                                <TimelineOppositeContent>
                                    <Typography variant="body2" color="textSecondary">
                                        { todo.time }
                                    </Typography>
                                </TimelineOppositeContent>

                                <TimelineSeparator>
                                    <TimelineDot color={ todo.theme } variant={ todo.variant }>
                                        { todo.icon }
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
                    <AddIcon />
                </Fab>
            </>

        </Timeline >
    );
}
