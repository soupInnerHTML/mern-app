import React from "react";
import PropTypes from "prop-types";
import { Chip } from "@material-ui/core";
import { useHttp } from "../../../hooks/useHttp";
import { useAuth } from "../../../hooks/useAuth";

const BookmarkTags = ({ tags, _id, deleteTag, editBookmarkTC, }) => {

    const { request, } = useHttp()
    const { token, } = useAuth()

    const handleDelete = (order) => {
        editBookmarkTC(request, token, _id, {
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
