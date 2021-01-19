import { thinRequest } from "../../utils/utils";
import { setIsReady, setToken } from "./authReducer";
import { setError } from "./errorReducer";

export const DELETE_TAG = "bookmarksReducer/deleteTag"
export const EDIT_BOOKMARK = "bookmarksReducer/editBookmark"
export const ADD_BOOKMARK = "bookmarksReducer/addBookmark"
export const DELETE_BOOKMARK = "bookmarksReducer/deleteBookmark"
export const SET_BOOKMARKS = "bookmarksReducer/setBookmarks"

export const deleteTag = (tagId, bId) => ({
    type: DELETE_TAG,
    tagId,
    bId,
})
export const setBookmarks = (bookmarks) => ({
    type: SET_BOOKMARKS,
    bookmarks,
})
export const editBookmark = (body, bId) => ({
    type: EDIT_BOOKMARK,
    body,
    bId,
})
export const addBookmark = (bookmark) => ({
    type: ADD_BOOKMARK,
    bookmark,
})
export const deleteBookmark = (id) => ({
    type: DELETE_BOOKMARK,
    id,
})

export const getBookmarksTC = (request, token, logout) => async dispatch => {
    try {
        const bookmarks = await thinRequest(request, "bookmark", token)
        dispatch(setBookmarks(bookmarks))
        dispatch(setIsReady(true))
    }
    catch (e) {
        dispatch( setError(e.message + " !") )
        dispatch(setIsReady(true))
        if (e.message === "Нет авторизации") {
            logout()
            dispatch(setToken(null))
        }
    }
}
export const addBookmarkTC = (request, token, payload) => async dispatch => {
    try {
        const bookmark = await thinRequest(request, "bookmark", token, "POST", payload)
        dispatch(addBookmark(bookmark.message))
    }
    catch (e) {
        dispatch( setError(e.message) )
    }
}
export const deleteBookmarkTC = (request, token, id) => async dispatch => {
    try {
        const bookmark = await thinRequest(request, "bookmark/" + id, token, "DELETE")
        dispatch(deleteBookmark(id))
    }
    catch (e) {
        dispatch( setError(e.message) )
    }
}
export const editBookmarkTC = (request, token, id, payload) => async dispatch => {
    try {
        dispatch(editBookmark(payload, id))
        const bookmark = await thinRequest(request, "bookmark/" + id, token, "PUT", payload)
    }
    catch (e) {
        dispatch( setError(e.message) )
    }
}

const initialState = [

]

const bookmarksReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_TAG:
            return state.map(bookmark => bookmark._id === action.bId ? {
                ...bookmark,
                tags: bookmark.tags.filter((_, order) => order !== action.tagId),
            } : bookmark)

        case SET_BOOKMARKS:
            return action.bookmarks
        case EDIT_BOOKMARK:
            const { body, } = action
            return state.map(bookmark => bookmark._id === action.bId ? {
                ...bookmark,
                ...body,
            } : bookmark)

        case DELETE_BOOKMARK:
            return state.filter(bookmark => bookmark._id !== action.id)

        case ADD_BOOKMARK:
            return [...state, action.bookmark]

        default:
            return state
    }
}

export default bookmarksReducer