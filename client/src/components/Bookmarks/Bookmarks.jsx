import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ProfileContainer from "../Common/Profile/ProfileContainer";
import Bookmark from "./Bookmark";
import { getBookmarks, getColors } from "../../redux/selectors";
import { connect } from "react-redux"
import { setIsReady } from "../../redux/reducers/authReducer";
import { setError } from "../../redux/reducers/errorReducer";
import { addBookmark, editBookmark } from "../../redux/reducers/bookmarksReducer";
import css from "../Todo/Todos/Todos.module.css";
import { Fab, Icon } from "@material-ui/core";
import sample from "lodash/sample"
import AddBtn from "../Common/AddBtn";

const Bookmarks = ({ colors, setIsReady, bookmarks, setError, editBookmark, addBookmark, }) => {
    useEffect(() => {
        setIsReady(true)
    }, [])
    return (
        <>
            <ProfileContainer link="Todos"/>

            {
                bookmarks.map(bookmark => {
                    return  <Bookmark key={ bookmark._id } { ...{ colors, ...bookmark, setError, editBookmark, } }></Bookmark>
                })
            }

            <AddBtn onClick={ () => addBookmark({ tags: [], color: sample(Object.keys(colors)), content: "Напишите что-нибудь...", }) }/>
        </>
    );
}

Bookmarks.propTypes = {};
Bookmarks.defaultProps = {};

const mapStateToProps = state => ({
    colors: getColors(state),
    bookmarks: getBookmarks(state),
})

const mapDispatchToProps = {
    setIsReady,
    setError,
    editBookmark,
    addBookmark,
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookmarks);
