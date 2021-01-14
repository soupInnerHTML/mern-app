import "./App.css";
import React from "react";

import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import HotelIcon from "@material-ui/icons/Hotel";
import RepeatIcon from "@material-ui/icons/Repeat";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import AddIcon from "@material-ui/icons/Add";
import Delete from "@material-ui/icons/Delete";

import { useRoutes } from "./hooks/useRoutes";
import { BrowserRouter } from "react-router-dom";
import { Container } from "@material-ui/core";
import { useAuth } from "./hooks/useAuth";
import { AuthContext } from "./context/AuthContext";
import { IconsContext } from "./context/IconsContext";
import CreateIcon from "@material-ui/icons/Create";

function App() {
    const { login, logout, token, userId, email, } = useAuth()
    const isAuth = !!token
    const routes = useRoutes(isAuth);
    const icons = {
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

    return (
        <AuthContext.Provider value={ { isAuth, login, logout, token, userId, email, } }>
            <IconsContext.Provider value={ icons }>
                <BrowserRouter>
                    <Container>
                        { routes }
                    </Container>
                </BrowserRouter>
            </IconsContext.Provider>
        </AuthContext.Provider>
    );
}

export default App;
