import React from "react";
import { Fab, Icon } from "@material-ui/core";

const AddBtn = (props) => {

    return (
        <Fab
            color="secondary"
            { ...props }
            style={ {
                right: 24,
                bottom: 16,
                position: "fixed",
            } }
        >
            <Icon>add</Icon>
        </Fab>
    );
};

export default AddBtn;
