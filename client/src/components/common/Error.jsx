import React, { useEffect } from "react"
import Slide from "@material-ui/core/Slide";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

function SlideTransition(props) {
    return <Slide { ...props } direction="up" />;
}

function Error({ error, clearError, }) {

    useEffect(() => {
        // console.log(error)
    }, [error])

    
    return <Snackbar
        open={ error.isOpen }
        autoHideDuration={ 6000 }
        onClose={ clearError }
        TransitionComponent={ SlideTransition }
    >
        <Alert onClose={ clearError } severity={ error.severity }>
            { error.text }
        </Alert>

    </Snackbar>


}

export default Error