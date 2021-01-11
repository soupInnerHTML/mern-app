import "./App.css";
import React from "react";

import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import HotelIcon from "@material-ui/icons/Hotel";
import RepeatIcon from "@material-ui/icons/Repeat";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import AddIcon from "@material-ui/icons/Add";

import { useRoutes } from "./hooks/useRoutes";
import { BrowserRouter } from "react-router-dom";
import { Container } from "@material-ui/core";
import { useAuth } from "./hooks/useAuth";
import { AuthContext } from "./context/AuthContext";
import { IconsContext } from "./context/IconsContext";

function App() {
    const { login, logout, token, userId, } = useAuth()
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
    }

    return (
        <AuthContext.Provider value={ { isAuth, login, logout, token, userId, } }>
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
