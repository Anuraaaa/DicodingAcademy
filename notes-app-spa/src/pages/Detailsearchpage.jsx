import React from "react";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
import NoteItem from "../components/NoteItem";

function Detailsearchpage({ notes, onArchiveUpdate, onDeleteNoteHandler }) {

    const [search, setSearch] = useSearchParams();
    const title = search.get("title");
    const searchNote = notes.filter(note => note.title.toLowerCase().includes(title.toLowerCase()));

    return (
        <div>
            <NoteItem notes={searchNote} onArchive={onArchiveUpdate} onDelete={onDeleteNoteHandler}/>
        </div>
    )
}

Detailsearchpage.propTypes = {
    notes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            body: PropTypes.string.isRequired,
            archived: PropTypes.bool.isRequired,
            createdAt: PropTypes.string.isRequired,
        })
    ).isRequired,
    onArchiveUpdate: PropTypes.func.isRequired,
    onDeleteNoteHandler: PropTypes.func.isRequired,
}

export default Detailsearchpage;