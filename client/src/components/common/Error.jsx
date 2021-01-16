import React from "react"
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

export default function Error({ errors, clearError, }) {
    if (errors?.length) {
        return errors.map((error, id) => {
            return (
                <Snackbar open={ !!error } autoHideDuration={ 6000 } onClose={ clearError.bind(0, id) }>
                    <Alert onClose={ clearError } severity="error">
                        { error }
                    </Alert>
                </Snackbar>
            )
        })
    }


    else {
        return <></>
    }
}
