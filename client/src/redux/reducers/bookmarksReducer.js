export const DELETE_TAG = "bookmarksReducer/deleteTag"
export const EDIT_BOOKMARK = "bookmarksReducer/editBookmark"
export const ADD_BOOKMARK = "bookmarksReducer/addBookmark"

export const deleteTag = (tagId, bId) => ({
    type: DELETE_TAG,
    tagId,
    bId,
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

const initialState = [
    {
        _id: 1,
        content: "Professionally network corporate action items and principle-centered total linkage. Holisticly deploy dynamic.",
        tags: ["tag"],
        color: "green",
        pos: {
            x: 0,
            y: 0,
        },
    },
    {
        _id: 2,
        content: "Synergistically foster enterprise networks rather than sticky \"outside the box\" thinking. Dramatically formulate.",
        tags: ["tag", "tag34", "tag234523452345", "tag3425", "tag3452345", "tag12312332534"],
        color: "orange",
        pos: {
            x: 100,
            y: 100,
        },
    }
]

const bookmarksReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_TAG:
            return state.map(bookmark => bookmark._id === action.bId ? {
                ...bookmark,
                tags: bookmark.tags.filter((_, order) => order !== action.tagId),
            } : bookmark)

        case EDIT_BOOKMARK:
            const { body, } = action
            return state.map(bookmark => bookmark._id === action.bId ? {
                ...bookmark,
                ...body,
            } : bookmark)

        case ADD_BOOKMARK:
            return [...state, action.bookmark]

        default:
            return state
    }
}

export default bookmarksReducer