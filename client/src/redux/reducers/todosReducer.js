import { thinRequest } from "../../utils/utils";
import { setError } from "./errorReducer";

const SET_TODOS = "todoReducer/setTodos"
const ADD_TODOS = "todoReducer/addTodos"

export const setTodos = todos => ({
    type: SET_TODOS,
    todos,
})
export const addTodos = todos => ({
    type: ADD_TODOS,
    todos,
})

const initialState = {
    todosData: [{
        _id: 1,
        time: "9:30 am",
        icon: "burger",
        label: "Eat",
        desc: "Because you need strength.",
    },
    {
        _id: 2,
        time: "10:00 am",
        icon: "laptop",
        label: "Code",
        desc: "Because it's awesome!",
        theme: "primary",
    },
    {
        _id: 3,
        time: "10:30 am",
        icon: "hotel",
        theme: "primary",
        label: "Sleep",
        desc: "Because you need rest",
        variant: "outlined",
    },
    {
        _id: 4,
        time: "11:30 am",
        icon: "repeat",
        label: "Repeat",
        desc: "Because this is the life you love!",
        theme: "secondary",
    }],
}

export const getTodosTC = (request, token) => async dispatch => {
    try {
        const todos = await thinRequest(request, "todo", token)
        dispatch(addTodos(todos))
    }
    catch (e) {
        dispatch( setError(e.message) )
    }
}

const todosReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TODOS:
            return { todosData: action.todos, }
        case ADD_TODOS:
            return { todosData: [...state.todos, ...action.todos], }
        default:
            return state
    }
}

export default todosReducer