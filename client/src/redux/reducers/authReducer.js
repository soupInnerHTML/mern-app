import { _ } from "../../utils/utils";

const SET_EMAIL = "authReducer/setEmail"
const SET_IS_AUTH = "authReducer/setIsAuth"

export const setEmail = (email) => ({
    type: SET_EMAIL,
    email,
})

export const setIsAuth = (flag) => ({
    type: SET_IS_AUTH,
    flag,
})

let initialState = {
    token: null,
    userId: null,
    login: _,
    logout: _,
    email: null,
    isAuth: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_EMAIL:
            return { ...state, email: action.email, }
        case SET_IS_AUTH:
            return { ...state, isAuth: action.flag, }
        default:
            return state
    }
}

export default authReducer