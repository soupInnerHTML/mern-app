export const getEmail = state => state.auth.email
export const getToken = state => state.auth.jwtToken
export const getIsReady = state => state.auth.isReady
export const getErrors = state => state.errorState.errors
export const getTodosData = state => state.todos.todosData
export const getTodoToEdit = state => state.todos.todoToEdit