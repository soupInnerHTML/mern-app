import React, { useEffect, useMemo, useState } from "react"
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import getId from "lodash/uniqueId"
import { Slide } from "@material-ui/core";

function SlideTransition(props) {
    return <Slide { ...props } direction="up" />;
}

function Error({ errors, clearError, setIsReady, }) {

    let _errors = [...new Set(errors)]

    const [html, setHtml] = useState([<></>])

    const getErrors = (__errors) => {
        let _s = __errors.map((error, id) => (
            <Snackbar
                key={ getId() }
                open={ !!error }
                autoHideDuration={ 6000 }
                onClose={ clearError.bind(0, id) }
                TransitionComponent={ SlideTransition }
            >
                <Alert onClose={ clearError } severity="error">
                    { error }
                </Alert>

            </Snackbar>
        ))

        setHtml(_s)
    }

    useEffect(() => getErrors(_errors), [JSON.stringify(_errors)])


    return html


}

export default Error