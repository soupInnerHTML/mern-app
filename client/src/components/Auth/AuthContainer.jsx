import React, { Component } from "react";
import Auth from "./Auth";
import { connect } from "react-redux"
import { getEmail } from "../../redux/selectors";

class AuthContainer extends Component {
    render() {
        return (
            <Auth></Auth>
        );
    }
}

let mapStateToProps = state => ({
    email: getEmail(state),
})

let mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);