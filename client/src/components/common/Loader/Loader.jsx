import React from "react";
import { CircularProgress } from "@material-ui/core";
import css from "./Loader.module.css";

const Loader = (props) => {
    return (
        <div style={ { animation: "fadeIn .4s", } } className={ css.loader }>
            <CircularProgress />
        </div>
    );
};


export default Loader;
