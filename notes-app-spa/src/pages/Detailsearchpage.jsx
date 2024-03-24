import React from "react";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
import NoteItem from "../components/NoteItem";
import Notfoundpage from "./Notfoundpage";

function Detailsearchpage({ notes, onArchiveUpdate, onDeleteNoteHandler }) {

    const [search, setSearch] = useSearchParams();
    const title = search.get("title");
    if (title) {
        const searchNote = notes.filter(note => note.title.toLowerCase().includes(title.toLowerCase()));
        return (
            <div>
                <NoteItem notes={searchNote} onArchive={onArchiveUpdate} onDelete={onDeleteNoteHandler}/>
            </div>
        )
    } else {
        return <Notfoundpage message={"Title query parameter not found"}/>
    }
}

Detailsearchpage.propTypes = {
    notes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
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