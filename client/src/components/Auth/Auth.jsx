import { Container } from "@material-ui/core";
import { useHttp } from "../../hooks/useHttp"
import React, { useContext, useState } from "react";
import Sign from "./Sign";
import Error from "../Common/Error";
import { AuthContext } from "../../context/AuthContext";
import { useFormChange } from "../../hooks/useFormChange";

export default function Auth() {
    const auth = useContext(AuthContext)
    const [isIn, setIn] = useState(true)
    const { loading, error, request, clearError, } = useHttp()
    const [authData, changeHandler] = useFormChange({ password: "", email: "", repeatPassword: "", })

    const registerHandler = async (e) => {
        e.preventDefault()
        try {
            const data = await request("api/auth/register", "POST", authData)
        }
        catch (e) {
            // console.log()
        }
    }

    const loginHandler = async (e) => {
        e.preventDefault()
        try {
            const data = await request("api/auth/login", "POST", authData)
            auth.login(data.token, data.userId)
        }
        catch (e) {
            // console.log()
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