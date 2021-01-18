import { Container } from "@material-ui/core";
import { useHttp } from "../../hooks/useHttp"
import React, { useEffect, useState } from "react";
import Sign from "./Sign";
import { useFormChange } from "../../hooks/useFormChange";
import { useAuth } from "../../hooks/useAuth";
import sample from "lodash/sample"

export default ({ loginTC, registerTC, setIsReady, colors, }) => {
    const [isIn, setIn] = useState(true)
    const { login, } = useAuth()
    const { loading, request, } = useHttp()
    const [authData, changeHandler] = useFormChange({ password: "", email: "", repeatPassword: "", })

    useEffect(() => {
        setIsReady(true)
    }, [])

    const handler = (e, fn, payload = {}) => {
        e.preventDefault()
        setIsReady(false)
        fn(request, { ...authData, ...payload, }, login)
    }


    const registerHandler = async (e) => {
        handler(e, registerTC, { avatar: sample(Object.keys(colors)), })
    }

    const loginHandler = async (e) => {
        handler(e, loginTC)
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