import React, { Component } from "react";
import store from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

class Root extends Component {
    render() {
        return (
            <BrowserRouter>
                <Provider { ...{ store, } }>
                    <App/>
                </Provider>
            </BrowserRouter>
        );
    }
}

export default Root;