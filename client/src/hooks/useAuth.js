import { useCallback, useEffect, useState } from "react"

export const useAuth = () => {
    let [token, setToken] = useState(null)
    let [userId, setUserId] = useState(null)
    let [email, setEmail] = useState(null)

    const login = useCallback((jwtToken, id, email) => {
        setToken(jwtToken)
        setUserId(id)
        setEmail(email)

        localStorage.setItem("storageName", JSON.stringify({
            userId: id, token: jwtToken, email,
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setEmail(null)
        
        localStorage.removeItem("storageName")
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("storageName"))

        if (data?.token) {
            login(data.token, data.userId, data.email)
        }
    }, [login])

    return { login, logout, token, userId, email, }
}