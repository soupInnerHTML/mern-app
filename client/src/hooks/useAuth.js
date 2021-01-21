import { useCallback, useEffect, useState } from "react"
import { clearStroage } from "../utils/redux.utils";

export const useAuth = () => {
    let [token, setToken] = useState(false)
    let [userId, setUserId] = useState(null)
    let [email, setEmail] = useState(null)
    let [avatar, setAvatar] = useState(null)

    const login = useCallback((jwtToken, id, email, avatar) => {
        setToken(jwtToken)
        setUserId(id)
        setEmail(email)
        setAvatar(avatar)

        localStorage.setItem("storageName", JSON.stringify({
            userId: id, token: jwtToken, email, avatar,
        }))
    }, [])

    const logout = useCallback((error) => {
        setToken(null)
        setUserId(null)
        setEmail(null)
        setAvatar(null)

        clearStroage()
        if (error){
            throw error
        }
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("storageName"))

        if (data?.token) {
            const { token, userId, email, avatar, } = data
            login(token, userId, email, avatar)
        }
    }, [login])

    return { login, logout, token, userId, email, avatar, }
}