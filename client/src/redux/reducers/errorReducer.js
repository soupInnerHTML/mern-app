const SET_ERROR = "errorReducer/setError"
const CLEAR_ERROR = "errorReducer/clearError"

export const setError = (error) => ({
    type: SET_ERROR,
    error,
})
export const clearError = () => ({
    type: CLEAR_ERROR,
})

const errorReducer = (state = "", action) => {
    switch (action.type) {
        case SET_ERROR:
            return action.error
        case CLEAR_ERROR:
            return ""
        default:
            return state
    }
}

export default errorReducer