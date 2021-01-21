import React from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import AuthContainer from "../components/Auth/AuthContainer";
import Todos from "../components/Todo/Todos/Todos";
import BookmarksContainer from "../components/Bookmarks/BookmarksContainer";
import Loader from "../components/Common/Loader/Loader";

export const useRoutes = (token, routes) => {
    if (token) {
        return (
            <Switch>
                <Route path={ routes.todos } exact>
                    <Todos/>
                </Route>

                <Route path={ routes.bookmarks }>
                    <BookmarksContainer/>
                </Route>

                <Redirect to={ routes.todos } />
            </Switch>
        )
    }

    else if (token === undefined) {
        return <Loader/>
    }

    return (
        <Switch>
            <Route path={ routes.auth } exact>
                <AuthContainer/>
            </Route>

            <Redirect to={ routes.auth } />
        </Switch>
    )
}