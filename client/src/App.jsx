import "./App.css";
import React, { useEffect } from "react";

import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import HotelIcon from "@material-ui/icons/Hotel";
import RepeatIcon from "@material-ui/icons/Repeat";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import AddIcon from "@material-ui/icons/Add";
import Delete from "@material-ui/icons/Delete";

import { useRoutes } from "./hooks/useRoutes";
import { useAuth } from "./hooks/useAuth";
import { Container } from "@material-ui/core";
import { IconsContext } from "./context/IconsContext";
import CreateIcon from "@material-ui/icons/Create";
import { connect } from "react-redux";
import { getEmail, getErrors, getIsAuth } from "./redux/selectors";
import { setEmail, setIsAuth, setLogin, setLogout } from "./redux/reducers/authReducer";
import { clearError, setError } from "./redux/reducers/errorReducer";
import Error from "./components/Common/Error";

function App({ setEmail, setIsAuth, setLogin, setLogout, isAuth, errors, setError, clearError, }) {
    const { login, logout, token, userId, email, } = useAuth()
    console.log(errors)

    //
    // useEffect(() => {
    //     setLogin(login)
    // }, [login])
    //
    // useEffect(() => {
    //     setLogout(logout)
    // }, [logout])

    useEffect(() => {
        setEmail(email)
    }, [email])

    useEffect(() => {
        setIsAuth(token)
    }, [token])

    useEffect(() => {
        setEmail(email)
    }, [])


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
        <IconsContext.Provider value={ icons }>
            <Container>
                { routes }
                <Error { ...{ errors, clearError, } }/>
            </Container>
        </IconsContext.Provider>
    );
}

let mapStateToProps = state => ({
    email: getEmail(state),
    isAuth: getIsAuth(state),
    errors: getErrors(state),
})

let mapDispatchToProps = {
    setEmail, setIsAuth, setLogin, setLogout, setError, clearError,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
