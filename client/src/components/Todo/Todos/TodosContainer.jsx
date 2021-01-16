import React, { Component } from "react";
import { getTodosData, getIsReady } from "../../../redux/selectors";
import { connect } from "react-redux";
import Todos from "./Todos";
import { setTodos, getTodosTC } from "../../../redux/reducers/todosReducer";

// class TodosContainer extends Component {
//     render() {
//         return (
//             <div>
//
//             </div>
//         );
//     }
// }

let mapStateToProps = state => ({
    todos: getTodosData(state),
    isReady: getIsReady(state),
})

let mapDispatchToProps = {
    setTodos, getTodosTC,
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos);