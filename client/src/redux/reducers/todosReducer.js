import { thinRequest } from "../../utils/utils";
import { setError } from "./errorReducer";
import { setIsReady } from "./authReducer";

const SET_TODOS = "todoReducer/setTodos"
const ADD_TODOS = "todoReducer/addTodos"
const DELETE_TODO = "todoReducer/deleteTodo"
const EDIT_TODO = "todoReducer/editTodo"
const SET_TODO_TO_EDIT = "todoReducer/setTodoToEdit"

export const setTodos = todos => ({
    type: SET_TODOS,
    todos,
})
export const addTodos = todos => ({
    type: ADD_TODOS,
    todos,
})
export const deleteTodo = id => ({
    type: DELETE_TODO,
    id,
})
export const editTodo = (id, body) => ({
    type: EDIT_TODO,
    id,
    body,
})
export const setTodoToEdit = todo => ({
    type: SET_TODO_TO_EDIT,
    todo,
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
    todoToEdit: null,
}

export const getTodosTC = (request, token, logout) => async dispatch => {
    try {
        const todos = await thinRequest(request, "todo", token)
        dispatch(addTodos(todos))
        dispatch(setIsReady(true))
    }
    catch (e) {
        dispatch( setError(e.message + " !") )
        dispatch(setIsReady(true))
        if (e.message === "Нет авторизации") {
            logout()
        }
    }
}

export const addTodosTC = (request, token, payload) => async dispatch => {
    try {
        const todos = await thinRequest(request, "todo", token, "POST", payload)
        dispatch(addTodos([todos.message]))
    }
    catch (e) {
        dispatch( setError(e.message) )
    }
}

export const deleteTodoTC = (request, token, id) => async dispatch => {
    try {
        const todos = await thinRequest(request, "todo/" + id, token, "DELETE")
        dispatch(deleteTodo(id))
    }
    catch (e) {
        dispatch( setError(e.message) )
    }
}

export const editTodoTC = (request, token, id, payload) => async dispatch => {
    try {
        const todos = await thinRequest(request, "todo/" + id, token, "PUT", payload)
        dispatch(editTodo(id, payload))
    }
    catch (e) {
        dispatch( setError(e.message) )
    }
}

const todosReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TODOS:
            return { ...state, todosData: action.todos, }
        case ADD_TODOS:
            return { ...state, todosData: [...state.todosData, ...action.todos], }
        case DELETE_TODO:
            return { ...state, todosData: state.todosData.filter(todoToDelete => todoToDelete._id !== action.id ), }
        case EDIT_TODO:
            return { ...state, todosData: state.todosData.map(todo => todo._id === action.id ? action.body : todo ), }
        case SET_TODO_TO_EDIT:
            return { ...state, todoToEdit: action.todo, }
        default:
            return state
    }
}

export default todosReducer