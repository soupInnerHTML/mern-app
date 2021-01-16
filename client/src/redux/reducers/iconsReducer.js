import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import HotelIcon from "@material-ui/icons/Hotel";
import RepeatIcon from "@material-ui/icons/Repeat";
import AddIcon from "@material-ui/icons/Add";
import Delete from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import React from "react";

const initialState = {
    todos: {
        laptop: props => <LaptopMacIcon  { ...props } />,
        burger: props => <FastfoodIcon  { ...props } />,
        hotel: props => <HotelIcon  { ...props } />,
        repeat: props =>  <RepeatIcon  { ...props } />,
    },
    add: props => <AddIcon { ...props } />,
    delete: props => <Delete { ...props } />,
    update: props => <CreateIcon  { ...props }/>,
}

const iconsReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state
    }
}

export default iconsReducer