import React from "react";
import { CircularProgress } from "@material-ui/core";
import css from "./Loader.module.css";
import cs from "classnames"

const Loader = (props) => {
    return (
        <div className={ cs(css.loader, "fadeIn") }>
            <CircularProgress />
        </div>
    );
};


export default Loader;
