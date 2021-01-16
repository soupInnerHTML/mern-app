import React, { Component } from "react";
import Auth from "./Auth";
import { connect } from "react-redux"
import { loginTC, registerTC, setIsReady } from "../../redux/reducers/authReducer";

// class AuthContainer extends Component {
//
//     render() {
//         return (
//             <Auth></Auth>
//         );
//     }
// }

let mapStateToProps = state => ({

})

let mapDispatchToProps = {
    loginTC, registerTC, setIsReady,
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);