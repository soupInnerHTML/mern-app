import { _ } from "../../utils/utils";

const SET_EMAIL = "authReducer/setEmail"
const SET_IS_AUTH = "authReducer/setIsAuth"
const SET_LOGIN = "authReducer/setLogin"
const SET_LOGOUT = "authReducer/setLogout"

export const setEmail = (email) => ({
    type: SET_EMAIL,
    email,
})
export const setIsAuth = (flag) => ({
    type: SET_IS_AUTH,
    flag,
})
export const setLogin = (login) => ({
    type: SET_LOGIN,
    login,
})
export const setLogout = (logout) => ({
    type: SET_LOGOUT,
    logout,
})

export const loginTC = (request, authData, login) => async dispatch => {
    const data = await request("api/auth/login", "POST", authData)
    login(data.token, data.userId, data.email)
    dispatch(setIsAuth(true))
    dispatch(setEmail(data.email))
}

const initialState = {
    // login: _,
    // logout: _,
    email: null,
    isAuth: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_EMAIL:
            return { ...state, email: action.email, }
        case SET_IS_AUTH:
            return { ...state, isAuth: action.flag, }
        case SET_LOGIN:
            return { ...state, login: action.login, }
        case SET_LOGOUT:
            return { ...state, logout: action.logout, }
        default:
            return state
    }
}

export default authReducer