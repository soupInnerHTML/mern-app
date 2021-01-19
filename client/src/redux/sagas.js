import { takeEvery, put } from "@redux-saga/core/effects";
import { clearError, SET_ALERT } from "./reducers/errorReducer";

export function* sagaWatcher() {
    yield takeEvery(SET_ALERT, sagaWorker)
}

function* sagaWorker() {
    // yield put(clearError())
}