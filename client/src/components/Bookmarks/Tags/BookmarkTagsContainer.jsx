import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteTag, editBookmarkTC } from "../../../redux/reducers/bookmarksReducer";
import BookmarkTags from "./BookmarkTags";


class BookmarkTagsContainer extends Component {
    render() {
        const { props, } = this
        return <BookmarkTags { ...props }></BookmarkTags>
    }
}

function mapStateToProps(state) {
    return {

    };
}

const mapDispatchToProps = {
    deleteTag,
    editBookmarkTC,
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(BookmarkTagsContainer);