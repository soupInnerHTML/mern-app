import { thinRequest } from "../../utils/redux.utils";
import { setError } from "./errorReducer";
import { setThunk } from "../actions";

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

const ENTITY = "bookmark"

export const getBookmarksTC = () => dispatch => {
    dispatch(setThunk(ENTITY, setBookmarks))
}
export const addBookmarkTC = payload => dispatch => {
    dispatch(setThunk(ENTITY, addBookmark, "POST", payload))
}
export const deleteBookmarkTC = id => dispatch => {
    dispatch(setThunk(`${ENTITY}/${id}`, deleteBookmark, "DELETE"))
}
export const editBookmarkTC = (id, payload) => async (dispatch, getState) => {
    try {
        dispatch(editBookmark(payload, id))
        const bookmark = await thinRequest(getState(), `${ENTITY}/${id}`, "PUT", payload)
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