import React from "react";
import PropTypes from "prop-types";
import { useNavigate, useSearchParams } from "react-router-dom";
import NoteItem from "../components/NoteItem";
import NoteSearch from "../components/NoteSearch";
import Notfoundpage from "./Notfoundpage";

function Detailsearchpage({ notes, onArchiveUpdate, onDeleteNoteHandler }) {

    const [search, setSearch] = useSearchParams();
    const title = search.get("title");

    let searchQuery = undefined;
    const navigate = useNavigate();

    function onClickSearch(searchQuery) {
        navigate(`/notes/search?title=${searchQuery}`);
    }

    function onSearchNote(query) {
        searchQuery = query;
    }
    
    let filterNote = notes;
    if (searchQuery !== undefined) {
        filterNote = notes.filter(note => note.title.toLowerCase().includes(searchQuery));
    }

    if (title) {
        const searchNote = notes.filter(note => note.title.toLowerCase().includes(title.toLowerCase()));
        return (
            <div>
                <NoteSearch notes={filterNote} onSearch={onSearchNote} onClickSearch={onClickSearch}/>
                <NoteItem notes={searchNote} onArchive={onArchiveUpdate} onDelete={onDeleteNoteHandler} isArchive={false} showAll={true}/>
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