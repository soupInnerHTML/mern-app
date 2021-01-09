import { createContext } from "react"

function _() { }

export const AuthContext = createContext({
    token: null,
    userId: null,
    login: _,
    logout: _,
    isAuth: false,
})