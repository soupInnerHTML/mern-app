import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import HotelIcon from "@material-ui/icons/Hotel";
import RepeatIcon from "@material-ui/icons/Repeat";
import AddIcon from "@material-ui/icons/Add";
import Delete from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import React from "react";
import { deepOrange, deepPurple, green, pink } from "@material-ui/core/colors";

const initialState = {
    icons: {
        laptop: props => <LaptopMacIcon  { ...props } />,
        burger: props => <FastfoodIcon  { ...props } />,
        hotel: props => <HotelIcon  { ...props } />,
        repeat: props =>  <RepeatIcon  { ...props } />,
        add: props => <AddIcon { ...props } />,
        delete: props => <Delete { ...props } />,
        update: props => <CreateIcon  { ...props }/>,
    },
    themes: ["primary", "secondary", "disabled", "default"],
    colors: {
        orange: {
            color: "#fff",
            backgroundColor: deepOrange[500],
        },
        purple: {
            color: "#fff",
            backgroundColor: deepPurple[500],
        },
        pink: {
            color: "#fff",
            backgroundColor: pink[500],
        },
        green: {
            color: "#fff",
            backgroundColor: green[500],
        },
    },
}

const libraryReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state
    }
}

export default libraryReducer