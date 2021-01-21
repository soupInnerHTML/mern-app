import React from "react"
import FormAddTodo from "./FormAddTodo";
import { Dialog, makeStyles, Slide } from "@material-ui/core"
import { setOpenModal } from "../../../redux/reducers/todosReducer";
import { connect } from "react-redux";
import { getModalOpen } from "../../../redux/selectors";

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
  

const ModalAddTodo = ({ isModalOpen, setOpenModal, action, }) => {
    const classes = useStyles()
    
    return (
        <Dialog
            open={ isModalOpen }
            className={ classes.modal }
            onClose={ () => setOpenModal(false) }
            TransitionComponent={ Transition }
            keepMounted
        >
            <div className={ classes.paper }>
                <FormAddTodo { ...{ action, } }/>
            </div>
        </Dialog>
    )
}

const mapStateToProps = state => ({
    isModalOpen: getModalOpen(state),
})


const mapDispatchToProps = {
    setOpenModal,
}


export default connect(mapStateToProps, mapDispatchToProps)(ModalAddTodo)
