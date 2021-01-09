import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Todos from './components/Todos'
import Auth from './components/Auth/Auth'

export const useRoutes = isAuth => {
    if (isAuth) {
        return (
            <Switch>
                <Route path="/" exact>
                    <Todos></Todos>
                </Route>

                <Redirect to="/"></Redirect>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/auth" exact>
                <Auth></Auth>
            </Route>

            <Redirect to="/auth"></Redirect>
        </Switch>
    )
}