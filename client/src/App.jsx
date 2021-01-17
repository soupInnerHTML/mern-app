import "./App.css";
import React, { useEffect } from "react";

import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import HotelIcon from "@material-ui/icons/Hotel";
import RepeatIcon from "@material-ui/icons/Repeat";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import AddIcon from "@material-ui/icons/Add";
import Delete from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";

import { IconsContext } from "./context/IconsContext";
import { useRoutes } from "./hooks/useRoutes";
import { useAuth } from "./hooks/useAuth";
import { CircularProgress, Container } from "@material-ui/core";
import { connect } from "react-redux";
import { getErrors, getIsReady, getToken } from "./redux/selectors";
import { clearError, setError } from "./redux/reducers/errorReducer";
import { setIsReady, setToken } from "./redux/reducers/authReducer";
import Error from "./components/Common/Error";
import Loader from "./components/Common/Loader/Loader";

function App({ errors, clearError, isReady, globalToken, setToken, }) {
    const { token, } = useAuth()

    useEffect(() => {
        setToken(token)
    }, [token])

    const routes = useRoutes(globalToken);

    const icons = {
        laptop: props => <LaptopMacIcon  { ...props } />,
        burger: props => <FastfoodIcon  { ...props } />,
        hotel: props => <HotelIcon  { ...props } />,
        repeat: props =>  <RepeatIcon  { ...props } />,
        add: props => <AddIcon { ...props } />,
        delete: props => <Delete { ...props } />,
        update: props => <CreateIcon  { ...props }/>,
    }

    return (
        <IconsContext.Provider value={ icons }>
            <Container>
                { routes }
                { !isReady && <Loader/> }
                <Error { ...{ errors, clearError, } }/>
            </Container>
        </IconsContext.Provider>
    );
}

let mapStateToProps = state => ({
    errors: getErrors(state),
    isReady: getIsReady(state),
    globalToken: getToken(state),
})

let mapDispatchToProps = {
    setError, clearError, setToken, setIsReady,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
