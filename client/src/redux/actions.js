export const LOGOUT = "actions/logout"

export const THUNK_SENT = "actions/thunkTypeGet"
export const setThunk = (entity, setState, method, payload) => ({
    type: THUNK_SENT,
    entity,
    setState,
    method,
    payload,
})