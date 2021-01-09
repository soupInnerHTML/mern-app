import { Container } from "@material-ui/core";
import { useHttp } from "../../hooks/useHttp"
import React, { useState } from "react";
import Sign from "./Sign";
import Error from "../../common/Error";

export default function Auth() {
    const [isIn, setIn] = useState(false)
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

    const signProps = {
        setIn, changeHandler, isIn, registerHandler, loading,
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