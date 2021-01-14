import { createContext } from "react"
import { _ } from "../utils/utils";


export const AuthContext = createContext({
    token: null,
    userId: null,
    login: _,
    logout: _,
    email: null,
    isAuth: false,
})