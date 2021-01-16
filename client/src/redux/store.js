import authReducer from "./reducers/authReducer";
import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunkMiddleware from "redux-thunk"
import errorReducer from "./reducers/errorReducer";
import iconsReducer from "./reducers/iconsReducer";
import todosReducer from "./reducers/todosReducer";

let reducers = combineReducers({
    auth: authReducer,
    errorState: errorReducer,
    icons: iconsReducer,
    todos: todosReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
let store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)) )

window.store = store

export default store