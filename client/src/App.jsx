import "./App.css";
import React from "react";
import { useRoutes } from "./routes";
import { BrowserRouter } from "react-router-dom";
import { Container } from "@material-ui/core";
import { useAuth } from "./hooks/useAuth";
import { AuthContext } from "./context/AuthContext";

function App() {
    const { login, logout, token, userId, } = useAuth()
    const isAuth = !!token
    const routes = useRoutes(isAuth);

    return (
        <AuthContext.Provider value={ { isAuth, login, logout, token, userId, } }>
            <BrowserRouter>
                <Container>
                    { routes }
                </Container>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
