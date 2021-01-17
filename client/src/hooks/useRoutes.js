import React from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import AuthContainer from "../components/Auth/AuthContainer";
import TodosContainer from "../components/Todo/Todos/TodosContainer";
import Loader from "../components/Common/Loader/Loader";

export const useRoutes = token => {
    if (token) {
        return (
            <Switch>
                <Route path="/" exact>
                    <TodosContainer/>
                </Route>

                <Redirect to="/" />
            </Switch>
        )
    }

    else if (token === undefined) {
        return <Loader/>
    }

    return (
        <Switch>
            <Route path="/auth" exact>
                <AuthContainer/>
            </Route>

            <Redirect to="/auth" />
        </Switch>
    )
}