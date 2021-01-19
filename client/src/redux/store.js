import authReducer from "./reducers/authReducer";
import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunkMiddleware from "redux-thunk"
import errorReducer from "./reducers/errorReducer";
import libraryReducer from "./reducers/libraryReducer";
import todosReducer from "./reducers/todosReducer";
import routesReducer from "./reducers/routesReducer";
import bookmarksReducer from "./reducers/bookmarksReducer";
import createSagaMiddleware from "redux-saga";
import { sagaWatcher } from "./sagas";

const saga = createSagaMiddleware()


let reducers = combineReducers({
    auth: authReducer,
    errors: errorReducer,
    library: libraryReducer,
    todos: todosReducer,
    routes: routesReducer,
    bookmarks: bookmarksReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
let store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware, saga)) )

saga.run(sagaWatcher)

window.store = store

export default store