import React from "react";
import { Chip } from "@material-ui/core";

const BookmarkTags = ({ tags, _id, deleteTag, editBookmarkTC, }) => {

    const handleDelete = (order) => {
        editBookmarkTC(_id, {
            tags: tags.filter((_, i) => i !== order),
        })
    }

    return tags.map((tag, order) => {
        return (
            <Chip
                key={ order }
                label={ tag }
                variant="outlined"
                onDelete={ () => handleDelete(order) }
            />
        )
    })
}

BookmarkTags.propTypes = {};
BookmarkTags.defaultProps = {};

export default BookmarkTags;
