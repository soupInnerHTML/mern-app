import "./App.css";
import React, { useEffect } from "react";
import { useRoutes } from "./hooks/useRoutes";
import { useAuth } from "./hooks/useAuth";
import { Container } from "@material-ui/core";
import { connect } from "react-redux";
import { getErrors, getIsReady, getRoutes, getToken } from "./redux/selectors";
import { clearError, setError } from "./redux/reducers/errorReducer";
import { setIsReady, setToken } from "./redux/reducers/authReducer";
import Error from "./components/Common/Error";
import Loader from "./components/Common/Loader/Loader";
import { setRequest } from "./redux/reducers/routesReducer";
import { useHttp } from "./hooks/useHttp";

function App({ error, clearError, isReady, globalToken, setToken, routes, setRequest, }) {
    const { token, } = useAuth()
    const { request, } = useHttp()

    useEffect(() => {
        if (globalToken !== null) {
            setToken(token)
        }
    }, [token])

    useEffect(() => {
        setRequest(request)
    }, [request])

    const routesTree = useRoutes(globalToken, routes);

    return (
        <Container>
            { routesTree }
            { !isReady && <Loader/> }
            <Error { ...{ error, clearError, } }/>
        </Container>
    );
}

let mapStateToProps = state => ({
    error: getErrors(state),
    isReady: getIsReady(state),
    globalToken: getToken(state),
    routes: getRoutes(state),
})

let mapDispatchToProps = {
    setError, clearError, setToken, setIsReady, setRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
