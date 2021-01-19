import React, { useState } from "react";
import PropTypes from "prop-types";
import { TextareaAutosize } from "@material-ui/core";
import css from "./EditContent.module.css"
import { connect } from "react-redux";
import { setAlert } from "../../../redux/reducers/errorReducer";
import { editBookmarkTC } from "../../../redux/reducers/bookmarksReducer";
import { useHttp } from "../../../hooks/useHttp";
import { useAuth } from "../../../hooks/useAuth";

const EditContent = ({ setAlert, editBookmarkTC, content, _id, }) => {
    let [edit, setEdit] = useState(false)
    let [editValue, setEditValue] = useState(content)
    let [startPulse, setStartPulse] = useState(false)

    const { request, } = useHttp()
    const { token, } = useAuth()

    const handleEdit = e => {
        setEditValue(e.target.value)
    }

    const saveEdit = e => {
        setEdit(false)
        editBookmarkTC(request, token, _id, { content: editValue.trim() || "Напишите что-нибудь...", }, _id)
    }

    const copyContent = (e) => {
        e.preventDefault()
        setStartPulse(true)
        setTimeout(() => setStartPulse(false), 350)
        navigator.clipboard.writeText(content)
        setAlert("Текст скопирован")
    }

    const showInfo = () => {
        setAlert("Use double click to edit bookmark and right click to fast copy text", "info")
    }

    return (
        <div className="drag-wrapper">
            <div
                style={ { cursor: "pointer", } }
                onBlur={ saveEdit }
                onClick={ showInfo }
                onDoubleClick={ setEdit.bind(0, true) }
            >
                { edit ? <TextareaAutosize
                    value={ editValue }
                    className={ css.editContent }
                    onChange={ handleEdit }
                /> : <p
                    onContextMenu={ copyContent }
                    style={ startPulse ? { animation: "pulse .35s", } : {} }
                >
                    { content }
                </p> }
            </div>
        </div>
    );
};

EditContent.propTypes = {};
EditContent.defaultProps = {};

const mapStateToProps = state => ({

})

const mapDispatchToProps = {
    setAlert,
    editBookmarkTC,
}

export default connect(mapStateToProps, mapDispatchToProps)(EditContent);
