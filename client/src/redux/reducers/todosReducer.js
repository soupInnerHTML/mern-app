import { setThunk } from "../actions";

const SET_TODOS = "todoReducer/setTodos"
export const ADD_TODO = "todoReducer/addTodo"
const DELETE_TODO = "todoReducer/deleteTodo"
export const EDIT_TODO = "todoReducer/editTodo"
const SET_CURRENT_TODO = "todoReducer/setCurrentTodo"
const SET_OPEN_MODAL = "todoReducer/setOpenModal"

export const setTodos = todos => ({
    type: SET_TODOS,
    todos,
})
export const addTodo = todo => ({
    type: ADD_TODO,
    todo,
})
export const deleteTodo = id => ({
    type: DELETE_TODO,
    id,
})
export const editTodo = todo => ({
    type: EDIT_TODO,
    todo,
})
export const setCurrentTodo = todo => ({
    type: SET_CURRENT_TODO,
    todo,
})
export const setOpenModal = flag => ({
    type: SET_OPEN_MODAL,
    flag,
})

const initialState = {
    todosData: [],
    currentTodo: null,
    isModalOpen: false,
}

const ENTITY = "todo"

export const getTodosTC = () => dispatch => {
    dispatch(setThunk(ENTITY, setTodos))
}
export const addTodosTC = payload => dispatch => {
    dispatch(setThunk(ENTITY, addTodo, "POST", payload))
}
export const deleteTodoTC = (id) => dispatch => {
    dispatch(setThunk(`${ENTITY}/${id}`, deleteTodo, "DELETE"))
}
export const editTodoTC = (id, payload) => dispatch => {
    dispatch(setThunk(`${ENTITY}/${id}`, editTodo, "PUT", payload))
}

const todosReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TODOS:
            return { ...state, todosData: action.todos, }
        case ADD_TODO:
            return { ...state, todosData: [...state.todosData, action.todo], }
        case DELETE_TODO:
            return {
                ...state,
                todosData: state.todosData.filter(todoToDelete => todoToDelete._id !== action.id ),
            }
        case EDIT_TODO:
            return {
                ...state,
                todosData: state.todosData.map(todo => todo._id === action.todo._id ? action.todo : todo ),
            }
        case SET_CURRENT_TODO:
            return { ...state, currentTodo: action.todo, }
        case SET_OPEN_MODAL:
            return { ...state, isModalOpen: action.flag, }
        default:
            return state
    }
}

export default todosReducer