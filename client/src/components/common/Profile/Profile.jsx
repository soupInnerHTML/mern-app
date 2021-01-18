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
}));

export default function Profile({ setToken, link, routes, colors, }) {
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
            <Link to={ routes[link.toLowerCase()] } className={ css.gradient }>{ link }</Link>
            <Avatar onClick={ handleClick } style={ { ...colors[avatar], cursor: "pointer", } }>{ (email || [" "])[0].toUpperCase() }</Avatar>

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