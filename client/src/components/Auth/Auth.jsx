import { Container } from "@material-ui/core";
import { useHttp } from "../../hooks/useHttp"
import React, { useEffect, useState } from "react";
import Sign from "./Sign";
import Error from "../Common/Error";
import { useFormChange } from "../../hooks/useFormChange";
import { useAuth } from "../../hooks/useAuth";
import sample from "lodash/sample"

export default function Auth({ loginTC, registerTC, setIsReady, }) {
    const [isIn, setIn] = useState(true)
    const { login, } = useAuth()
    const { loading, error, request, clearError, } = useHttp()
    const [authData, changeHandler] = useFormChange({ password: "", email: "", repeatPassword: "", })
    const colors = ["orange", "purple", "pink", "green"]

    useEffect(() => {
        setIsReady(true)
        console.log(sample(colors))
    }, [])


    const registerHandler = async (e) => {
        e.preventDefault()
        registerTC(request, { ...authData, avatar: sample(colors), }, login)
    }

    const loginHandler = async (e) => {
        e.preventDefault()
        loginTC(request, authData, login)
    }

    const signProps = {
        setIn, changeHandler, registerHandler, loginHandler, loading, isIn, authData,
    }


    return (
        <Container component="main" maxWidth="xs">
            <Sign { ...signProps }/>
        </Container >
    )
}