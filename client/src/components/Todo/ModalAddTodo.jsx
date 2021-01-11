import React from "react"
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles, Modal } from "@material-ui/core"
import FormAddTodo from "./FormAddTodo";

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
        // boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));
  

export default function ModalAddTodo({ isOpenModal, setOpenModal, addTodo, }) {
    // let [open, setOpen] = React.useState(false)
    const classes = useStyles()
    const handleClose = () => setOpenModal(false)
    
    return (
        <>
            <Modal
                open={ isOpenModal }
                className={ classes.modal }
                onClose={ handleClose }
            >
                <div className={ classes.paper }>
                    { /* <CloseIcon onClick={ handleClose }></CloseIcon> */ }
                    <FormAddTodo { ...{ handleClose, addTodo, } }></FormAddTodo>
                </div>
            </Modal>
        </>
    )
}
