import React, { Component } from "react";
import { connect } from "react-redux";
import { setError } from "../../../redux/reducers/errorReducer";
import Todo from "./Todo";

class TodoContainer extends Component {
    render() {
        const { props, } = this
        
        return (
            <Todo { ...props }/>
        );
    }
}


export default connect(null, { setError, })(TodoContainer)