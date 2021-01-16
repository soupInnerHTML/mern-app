const SET_ERROR = "errorReducer/setError"
const CLEAR_ERROR = "errorReducer/clearError"

export const setError = (error) => ({
    type: SET_ERROR,
    error,
})
export const clearError = (errorId) => ({
    type: CLEAR_ERROR,
    errorId,
})

const initialState = {
    errors: [],
}

const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ERROR:
            return { errors: [...state.errors, action.error], }
        case CLEAR_ERROR:
            return { errors: state.errors.filter((_, id) => id === action.errorId), }
        default:
            return state
    }
}

export default errorReducer