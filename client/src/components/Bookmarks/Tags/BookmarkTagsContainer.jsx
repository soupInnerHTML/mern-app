import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteTag } from "../../../redux/reducers/bookmarksReducer";
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
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(BookmarkTagsContainer);