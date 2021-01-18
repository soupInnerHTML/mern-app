import React, { Component } from "react";
import Profile from "./Profile";
import { connect } from "react-redux"
import { setToken } from "../../../redux/reducers/authReducer";
import { getColors, getRoutes } from "../../../redux/selectors";

class ProfileContainer extends Component {
    render() {
        const { props, } = this
        return (
            <Profile { ...props }></Profile>
        );
    }
}

let mapStateToProps = state => ({
    routes: getRoutes(state),
    colors: getColors(state),
})

let mapDispatchToProps = {
    setToken,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);