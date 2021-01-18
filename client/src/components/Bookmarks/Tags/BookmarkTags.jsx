import React from "react";
import PropTypes from "prop-types";
import { Chip } from "@material-ui/core";

const BookmarkTags = ({ tags, _id, deleteTag, }) => {

    return tags.map((tag, order) => {
        return (
            <Chip
                key={ order }
                label={ tag }
                variant="outlined"
                onDelete={ deleteTag.bind(0, order, _id ) }
            />
        )
    })
};

BookmarkTags.propTypes = {};
BookmarkTags.defaultProps = {};

export default BookmarkTags;
