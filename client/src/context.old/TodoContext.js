import { createContext } from "react";
import { _ } from "../utils/utils";

export const TodosContext = createContext({
    todos: null,
    setTodos: _,
})