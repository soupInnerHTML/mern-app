import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../../../hooks/useAuth";
import { deepOrange, deepPurple, green, pink } from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import Menu from "@material-ui/core/Menu";
import { Link } from "react-router-dom";
import css from "./Profile.module.css"


const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        position: "absolute",
        top: theme.spacing(2),
        right: theme.spacing(3),
        zIndex: 2,
        "& > *": {
            margin: theme.spacing(1),
        },
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
    pink: {
        color: theme.palette.getContrastText(pink[500]),
        backgroundColor: pink[500],
    },
    green: {
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
    },
}));

export default function Profile({ setToken, }) {
    const material = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const { logout, email, avatar, } = useAuth()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const exitOnClick = () => {
        handleClose();
        logout()
        setToken(null)
    }

    return (
        <div className={ material.root }>
            <Link to="/" className={ css.gradient }>Bookmarks</Link>
            <Avatar onClick={ handleClick } style={ { cursor: "pointer", } } className={ material[avatar] }>{ (email || [" "])[0].toUpperCase() }</Avatar>

            <Menu
                id="simple-menu"
                getContentAnchorEl={ null }
                anchorOrigin={ {
                    vertical: "bottom",
                    horizontal: "left",
                } }
                transformOrigin={ {
                    vertical: "top",
                    horizontal: "left",
                } }
                anchorEl={ anchorEl }
                keepMounted
                open={ Boolean(anchorEl) }
                onClose={ handleClose }
               
            >
                <MenuItem>{ email }</MenuItem>
                <Divider style={ { opacity: 0.5, } } />
                <MenuItem onClick={ exitOnClick }>Log out...</MenuItem>
                <MenuItem>Temp</MenuItem>
                <MenuItem>Temp</MenuItem>
                <MenuItem>Temp</MenuItem>
            </Menu>
        </div>
    );
}