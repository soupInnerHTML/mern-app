import React, { useState } from "react";
import PropTypes from "prop-types";
import { Icon, Paper, TextareaAutosize } from "@material-ui/core";
import Draggable from "react-draggable";
import css from "./Bookmarks.module.css"
import cs from "classnames"
import BookmarkTagsContainer from "./Tags/BookmarkTagsContainer";
import EditContent from "./Edit/EditContent";
import { connect } from "react-redux";
import { deleteBookmarkTC, editBookmarkTC } from "../../redux/reducers/bookmarksReducer";
import { useHttp } from "../../hooks/useHttp";
import { useAuth } from "../../hooks/useAuth";

const Bookmark = ({ colors, pos, color, content, tags, _id, deleteBookmarkTC, editBookmarkTC, }) => {

    const [isClose, setClose] = useState(false)
    const { request, } = useHttp()
    const { token, } = useAuth()

    const close = () => {
        setClose(true)
        setTimeout(() => deleteBookmarkTC(request, token, _id), 800)
    }

    const setPosOnStop = (e, data) => {
        // console.log("Event: ", e);
        // console.log("Data: ", data);

        editBookmarkTC(request, token, _id, { pos: {
            x: data.lastX,
            y: data.lastY, },
        }, _id)
    };

    return (
        <>
            <Draggable position={ pos } onStop={ setPosOnStop } handle="#handle">
                <Paper elevation={ 3 } className={ cs(css.bookmark, { zoomOut: isClose, }) } style={ colors[color] }>

                    <Icon color="#fff" className={ css.close } onClick={ close }>close</Icon>

                    <div className={ css.handle } id={ "handle" }></div>

                    <EditContent { ...{ content, _id, } }/>

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

const mapStateToProps = state => ({

})

const mapDispatchToProps = {
    deleteBookmarkTC,
    editBookmarkTC,
}


export default connect(mapStateToProps, mapDispatchToProps)(Bookmark);
