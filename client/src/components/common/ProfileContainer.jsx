import React, { Component } from "react";
import Profile from "./Profile";
import { connect } from "react-redux"
import { getEmail } from "../../redux/selectors";
import { setEmail } from "../../redux/reducers/authReducer";

// class ProfileContainer extends Component {
//     render() {
//         return (
//             <Profile email={{}}></Profile>
//         );
//     }
// }

let mapStateToProps = state => ({
    email: getEmail(state),
})

let mapDispatchToProps = {
    setEmail,
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);