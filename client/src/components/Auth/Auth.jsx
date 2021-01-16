import { Container } from "@material-ui/core";
import { useHttp } from "../../hooks/useHttp"
import React, { useState } from "react";
import Sign from "./Sign";
import Error from "../Common/Error";
import { useFormChange } from "../../hooks/useFormChange";
import { useAuth } from "../../hooks/useAuth";

export default function Auth({ email, loginTC, }) {
    const [isIn, setIn] = useState(true)
    const { login, } = useAuth()
    const { loading, error, request, clearError, } = useHttp()
    const [authData, changeHandler] = useFormChange({ password: "", email: "", repeatPassword: "", })


    const registerHandler = async (e) => {
        e.preventDefault()
        try {
            const data = await request("api/auth/register", "POST", authData)
            // await loginReq(authData)
        }
        catch (e) {
        }
    }

    const loginHandler = async (e) => {
        e.preventDefault()
        try {
            loginTC(request, authData, login)
        }
        catch (e) {
            console.log(e)
        }
    }

    const signProps = {
        setIn, changeHandler, registerHandler, loginHandler, loading, isIn, authData,
    }
    const errorProps = {
        error, clearError,
    }


    return (
        <Container component="main" maxWidth="xs">
            <Sign { ...signProps }/>
            { /*<Error { ...errorProps }/>*/ }
        </Container >
    )
}