import React from "react";
import PropTypes from "prop-types";
import NoteSearch from "../components/NoteSearch";
import NoteItem from "../components/NoteItem";
import { useNavigate } from "react-router-dom";

function Archivepage({notes, onArchiveUpdate, onDeleteNoteHandler}) {

    let searchQuery = undefined;
    const navigate = useNavigate();

    function onClickSearch(searchQuery) {
        navigate(`/notes/search?title=${searchQuery}`);
    }

    function onSearchNote(query) {
        searchQuery = query;
    }
    
    let filterNote = notes;
    filterNote = notes.filter(note => note.archived === true);

    if (searchQuery !== undefined) {
        filterNote = notes.filter(note => note.title.toLowerCase().includes(searchQuery)).filter(note => note.archived === true);
    }

    return (
        <div>
            <NoteSearch notes={filterNote} onSearch={onSearchNote} onClickSearch={onClickSearch}/>
            <NoteItem notes={filterNote} onArchive={onArchiveUpdate} onDelete={onDeleteNoteHandler} isArchive={true} showAll={false}/>
        </div>
    )
}

Archivepage.propTypes = {
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
    onDeleteNoteHandler: PropTypes.func.isRequired
}

export default Archivepage;