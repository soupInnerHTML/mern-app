import { _ } from "../../utils/utils";

const SET_REQUEST = "routesReducer/setRequest"

export const setRequest = (request) => ({
    type: SET_REQUEST,
    request,
})

const initialState = {
    bookmarks: "/bookmarks",
    todos: "/",
    auth: "/auth",
    request: _,
}

const routesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_REQUEST:
            return { ...state, request: action.request, }
        default:
            return state
    }
}

export default routesReducer