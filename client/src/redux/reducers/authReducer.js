import { setError } from "./errorReducer";

const SET_EMAIL = "authReducer/setEmail"
const SET_TOKEN = "authReducer/setToken"
const SET_IS_READY = "authReducer/setIsReady"

export const setEmail = (email) => ({
    type: SET_EMAIL,
    email,
})
export const setToken = (token) => ({
    type: SET_TOKEN,
    token,
})
export const setIsReady = (flag) => ({
    type: SET_IS_READY,
    flag,
})

export const loginTC = (request, authData, login) => async dispatch => {
    try {
        const data = await request("api/auth/login", "POST", authData)
        const { token, userId, email, avatar, } = data
        login(token, userId, email, avatar)
        dispatch(setToken(token))
        dispatch(setEmail(email))
    }
    catch (e) {
        dispatch(setError((e.message)))
        dispatch(setIsReady(true))
    }
}

export const registerTC = (request, authData, login) => async dispatch => {
    try {
        const data = await request("api/auth/register", "POST", authData)
        dispatch(loginTC(request, authData, login))
    }
    catch (e) {
        dispatch(setError((e.message)))
        dispatch(setIsReady(true))
    }
}

const initialState = {
    email: null,
    jwtToken: undefined,
    isReady: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_EMAIL:
            return { ...state, email: action.email, }
        case SET_TOKEN:
            return { ...state, jwtToken: action.token, }
        case SET_IS_READY:
            return { ...state, isReady: action.flag, }
        default:
            return state
    }
}

export default authReducer