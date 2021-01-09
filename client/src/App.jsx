import "./App.css";
import React from "react";
import { useRoutes } from "./routes";
import { BrowserRouter } from "react-router-dom";
import { Container } from "@material-ui/core";
import { useAuth } from "./hooks/useAuth";

function App() {
    const { login, logout, token, userId, } = useAuth()
    const routes = useRoutes(false);

    return (
        <BrowserRouter>
            <Container>
                { routes }
            </Container>
        </BrowserRouter>
    );
}

export default App;
