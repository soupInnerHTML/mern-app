import React, { Component } from "react";
import { getTodosData, getIsReady, getIcons } from "../../../redux/selectors";
import { connect } from "react-redux";
import { setTodos, getTodosTC } from "../../../redux/reducers/todosReducer";
import Todos from "./Todos";

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
    icons: getIcons(state),
    isReady: getIsReady(state),
})

let mapDispatchToProps = {
    setTodos, getTodosTC,
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos);