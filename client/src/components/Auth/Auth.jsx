import { Container } from "@material-ui/core";
import { useHttp } from "../../hooks/useHttp"
import React, { useContext, useState } from "react";
import Sign from "./Sign";
import Error from "../common/Error";
import { AuthContext } from "../../context/AuthContext";

export default function Auth() {
    const auth = useContext(AuthContext)
    const [isIn, setIn] = useState(true)
    const { loading, error, request, clearError, } = useHttp()
    const [authData, setAuthData] = useState({ password: "", email: "", repeatPassword: "", })

    const changeHandler = e => {
        setAuthData({ ...authData, [e.target.name]: e.target.value, })
        console.log(e.target.value)
    }

    const registerHandler = async (e) => {
        e.preventDefault()
        try {
            const data = await request("api/auth/register", "POST", authData)
        }
        catch (e) {
            // console.log('Toast: ' + error)
        }
    }

    const loginHandler = async (e) => {
        e.preventDefault()
        try {
            const data = await request("api/auth/login", "POST", authData)
            auth.login(data.token, data.userId)
        }
        catch (e) {
            // console.log('Toast: ' + error)
        }
    }

    const signProps = {
        setIn, changeHandler, registerHandler, loginHandler, loading, isIn,
    }
    const errorProps = {
        error, clearError,
    }


    return (
        <Container component="main" maxWidth="xs">
            <Sign { ...signProps }></Sign>
            <Error { ...errorProps }></Error>
        </Container >
    )
}