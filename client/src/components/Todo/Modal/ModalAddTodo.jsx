import React from "react"
import { Dialog, makeStyles, Slide } from "@material-ui/core"
import FormAddTodoContainer from "./FormAddTodoContainer";

const useStyles = makeStyles((theme) => ({
    root: {
        height: 300,
        flexGrow: 1,
        minWidth: 300,
        transform: "translateZ(0)",
        // The position fixed scoping doesn't work in IE 11.
        // Disable this demo to preserve the others.
        "@media all and (-ms-high-contrast: none)": {
            display: "none",
        },
    },
    modal: {
        display: "flex",
        padding: theme.spacing(1),
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        width: 400,
        backgroundColor: theme.palette.background.paper,
        outline: "none",
        padding: theme.spacing(2, 4, 3),
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ ref } { ...props } />;
});
  

export default function ModalAddTodo({ isOpenModal, setOpenModal, action, }) {
    const classes = useStyles()
    const handleClose = () => setOpenModal(false)
    
    return (
        <>
            <Dialog
                open={ isOpenModal }
                className={ classes.modal }
                onClose={ handleClose }
                TransitionComponent={ Transition }
            >
                <div className={ classes.paper }>
                    <FormAddTodoContainer { ...{ handleClose, action, } }/>
                </div>
            </Dialog>
        </>
    )
}
