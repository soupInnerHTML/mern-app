import React from "react"
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

export default function Error({ error, clearError, }) {

    if (error) {
        return (
            <Snackbar open={ !!error } autoHideDuration={ 6000 } onClose={ clearError }>
                <Alert onClose={ clearError } severity="error">
                    { error }
                </Alert>
            </Snackbar>
        )
    }

    else return <></>
}
