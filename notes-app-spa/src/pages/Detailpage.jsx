import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import NoteItem from "../components/NoteItem";
import { formatDate } from "../utils/formatter";

function Detailpage({ notes, onArchiveUpdate, onDeleteNoteHandler }) {

    const { id } = useParams();
    const noteData = notes.filter(note => note.id == id);
    const otherData = notes.filter(note => note.id != id);
    return (
        <div>
            {
                noteData.map((note, i) => {
                    return (
                        <div key={i} className="note-container-detail">
                            <h1>{note.title}</h1>
                            <p>{formatDate(note.createdAt)}</p>
                            <p>{note.archived? "Archive" : "Active"}</p>
                            <p>{note.body}</p>
                        </div>
                    )
                })
            }
            <NoteItem notes={otherData} onArchive={onArchiveUpdate} onDelete={onDeleteNoteHandler}/>
        </div>
    )
}

Detailpage.propTypes = {
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

export default Detailpage;