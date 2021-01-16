import React, { Component } from "react";
import Profile from "./Profile";
import { connect } from "react-redux"
import { setToken } from "../../redux/reducers/authReducer";

// class ProfileContainer extends Component {
//     render() {
//         return (
//             <Profile email={{}}></Profile>
//         );
//     }
// }

let mapStateToProps = state => ({

})

let mapDispatchToProps = {
    setToken,
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);