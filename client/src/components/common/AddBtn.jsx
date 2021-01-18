import React from "react";
import { Fab, Icon } from "@material-ui/core";

const AddBtn = (props) => {

    return (
        <Fab color="secondary" style={ {
            right: 24,
            bottom: 16,
            position: "absolute",
        } }>
            <Icon { ...props }>add</Icon>
        </Fab>
    );
};

export default AddBtn;
