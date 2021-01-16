import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../../hooks/useAuth";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

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
        cursor: "pointer",
    },
    sep: {
        borderBottom: "1px solid rgba(0,0,0, .05)",
    },
}));

export default function Profile({ email, setIsAuth, }) {
    const material = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const { logout, } = useAuth()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const exitOnClick = () => {
        handleClose();
        logout()
        setIsAuth(false)
    }

    return (
        <div className={ material.root }>
            <Avatar onClick={ handleClick } className={ material.purple }>{ (email || [" "])[0].toUpperCase() }</Avatar>

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
                <MenuItem className={ material.sep } >{ email }</MenuItem>
                <MenuItem onClick={ exitOnClick }>Log out...</MenuItem>
                <MenuItem>Temp</MenuItem>
                <MenuItem>Temp</MenuItem>
                <MenuItem>Temp</MenuItem>
            </Menu>
        </div>
    );
}