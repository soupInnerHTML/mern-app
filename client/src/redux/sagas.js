import { takeEvery, put, select, call } from "@redux-saga/core/effects";
import { SET_ERROR, setError } from "./reducers/errorReducer";
import { SET_TOKEN, setIsReady, setToken } from "./reducers/authReducer";
import { clearStroage, thinRequest } from "../utils/redux.utils";
import { LOGOUT, THUNK_SENT } from "./actions";
import { ADD_TODO, EDIT_TODO, setOpenModal } from "./reducers/todosReducer";

export function* sagaWatcher() {
    yield takeEvery(SET_ERROR, errorWorker)
    yield takeEvery(LOGOUT, tokenWorker)
    yield takeEvery([ADD_TODO, EDIT_TODO], todoWorker)
    const action = yield takeEvery(THUNK_SENT, thunkWorker)
}

function* errorWorker() {
    const state = yield select();
    yield put(setIsReady(true));
    if (state.errors.text === "Нет авторизации") {
        yield put({ type: LOGOUT, })
    }
}

function* tokenWorker() {
    const state = yield select();
    if (state.auth.jwtToken ?? null) {
        yield put(setToken(null))
        clearStroage()
    }
}

function* todoWorker() {
    yield put(setOpenModal(false))
}

function* thunkWorker(action) {
    try {
        const state = yield select();
        const { entity, method, payload, } = action
        const response = yield call(thinRequest.bind(0, state, entity, method, payload))

        yield put(action.setState(response))
        yield put(setIsReady(true))
    }
    catch (e) {
        yield put( setError(e.message) )
    }
}