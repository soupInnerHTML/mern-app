import React, { Component } from "react";
import Auth from "./Auth";
import { connect } from "react-redux"
import { loginTC } from "../../redux/reducers/authReducer";

// class AuthContainer extends Component {
//
//     render() {
//         return (
//             <Auth></Auth>
//         );
//     }
// }

let mapStateToProps = state => ({
    // login: getLogin(state),
})

let mapDispatchToProps = {
    loginTC,
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);