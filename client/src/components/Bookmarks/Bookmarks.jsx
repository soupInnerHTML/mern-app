import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ProfileContainer from "../Common/Profile/ProfileContainer";
import Bookmark from "./Bookmark";
import { getBookmarks, getColors } from "../../redux/selectors";
import { connect } from "react-redux"
import { addBookmarkTC, getBookmarksTC } from "../../redux/reducers/bookmarksReducer";
import sample from "lodash/sample"
import AddBtn from "../Common/AddBtn";
import { useAuth } from "../../hooks/useAuth";
import { useHttp } from "../../hooks/useHttp";

const Bookmarks = ({ colors, bookmarks, addBookmarkTC, getBookmarksTC, }) => {

    const { request, } = useHttp()
    const { token, logout, userId, } = useAuth()

    useEffect(() => {
        if (token) {
            getBookmarksTC(request, token, logout)
        }
    }, [request, token])

    const addHandler = () => {
        const WIDTH = window.innerWidth
        const HEIGHT = window.innerHeight

        const body = {
            tags: [],
            color: sample(Object.keys(colors)),
            content: "Напишите что-нибудь...",
            owner: userId,
            pos: {
                x: Math.round(Math.random() * Math.round(WIDTH / 1.3)),
                y: Math.round(Math.random() * Math.round(HEIGHT / 1.3)),
            },
        }


        console.log(body)

        // addBookmark(body)
        addBookmarkTC(request, token, body)
    }

    return (
        <>
            <ProfileContainer link="Todos"/>

            {
                bookmarks.map(bookmark => {
                    return  <Bookmark key={ bookmark._id } { ...{ colors, ...bookmark, } }/>
                })
            }

            <AddBtn onClick={ addHandler  }/>
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
    addBookmarkTC,
    getBookmarksTC,
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookmarks);
