import { takeEvery, put, select } from "@redux-saga/core/effects";
import { SET_ERROR } from "./reducers/errorReducer";
import { SET_TOKEN, setIsReady, setToken } from "./reducers/authReducer";
import { clearStroage } from "../utils/utils";
import { LOGOUT } from "./actions";

export function* sagaWatcher() {
    yield takeEvery(SET_ERROR, errorWorker)
    yield takeEvery(LOGOUT, tokenWorker)
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