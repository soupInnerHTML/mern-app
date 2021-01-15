import "./App.css";
import React, { useEffect } from "react";

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
import { Provider, connect } from "react-redux";
import store from "./redux/store";
import { getEmail, getIsAuth } from "./redux/selectors";
import { setEmail, setIsAuth } from "./redux/reducers/authReducer";

function App({ setEmail, setIsAuth, }) {
    const { login, logout, token, userId, email, } = useAuth()

    useEffect(() => {
        setEmail(email)
    }, [email])

    // useEffect(() => {
    //     setIsAuth(!!token)
    // }, [token])

    // const isAuth = !!token
    const routes = useRoutes(!!token);
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
        // <AuthContext.Provider value={ { isAuth, login, logout, token, userId, email, } }>
        <IconsContext.Provider value={ icons }>
            <Container>
                { routes }
            </Container>
        </IconsContext.Provider>
    );
}

let mapStateToProps = state => ({
    email: getEmail(state),
})

let mapDispatchToProps = {
    setEmail, setIsAuth,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
