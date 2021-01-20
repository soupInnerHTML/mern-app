export const SET_ERROR = "errorReducer/setError"
export const SET_ALERT = "errorReducer/setSuccess"
const CLEAR_ERROR = "errorReducer/clearError"

export const setError = (text) => ({
    type: SET_ERROR,
    text,
    severity: "error",
})
export const setAlert = (text, severity = "success") => ({
    type: SET_ALERT,
    text,
    severity,
})
export const clearError = () => ({
    type: CLEAR_ERROR,
})

const errorReducer = (state = { text: "", severity: "", isOpen: false, }, action) => {
    switch (action.type) {
        case SET_ERROR:
        case SET_ALERT:
            return { text: action.text, severity: action.severity, isOpen: true, }
        case CLEAR_ERROR:
            return { ...state, isOpen: false, }
        default:
            return state
    }
}

export default errorReducer