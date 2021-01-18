import React, { useState } from "react";
import PropTypes from "prop-types";
import { Icon, Paper } from "@material-ui/core";
import Draggable from "react-draggable";
import css from "./Bookmarks.module.css"
import BookmarkTagsContainer from "./Tags/BookmarkTagsContainer";

const Bookmark = ({ colors, pos, color, content, tags, _id, setError, editBookmark, }) => {

    let [edit, setEdit] = useState(false)
    let [editValue, setEditValue] = useState(content)

    const handleEdit = e => {
        setEditValue(e.target.value)
    }

    const saveEdit = e => {
        setEdit(false)
        editBookmark({ content: editValue, }, _id)
    }

    const setPosOnStop = (e, data) => {
        // console.log("Event: ", e);
        // console.log("Data: ", data);
        editBookmark({ pos: {
            x: data.lastX,
            y: data.lastY, },
        }, _id)
    };

    const copyContent = () => {
        navigator.clipboard.writeText(content)
        setError("Текст скопирован")
    }

    return (
        <>
            <Draggable defaultPosition={ pos } onStop={ setPosOnStop }>
                <Paper elevation={ 3 } className={ css.bookmark } style={ colors[color] }>
                    <div className="drag-wrapper">
                        <div
                            onClick={ copyContent }
                            style={ { cursor: "pointer", } }
                            onBlur={ saveEdit }
                            onDoubleClick={ setEdit.bind(0, true) }>
                            { edit ? <textarea value={ editValue } onChange={ handleEdit }/> : content }
                        </div>
                    </div>

                    <div className={ css.tags }>
                        <BookmarkTagsContainer { ...{ tags, _id, } }/>

                        <Icon color="disabled">add_circle</Icon>
                    </div>

                </Paper>

            </Draggable>

        </>
    );
};

Bookmark.propTypes = {};
Bookmark.defaultProps = {};

export default Bookmark;
