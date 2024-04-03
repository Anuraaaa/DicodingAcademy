import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import NoteItem from "../components/NoteItem";
import { showFormattedDate } from "../utils";

function Detailpage({ notes, onArchiveUpdate, onDeleteNoteHandler }) {

    const { id } = useParams();
    const noteData = notes.data.filter(note => note.id == id);
    const otherData = notes.data.filter(note => note.id != id);
    return (
        <div>
            {
                noteData.map((note, i) => {
                    return (
                        <div key={i} className="note-container-detail">
                            <h1>{note.title}</h1>
                            <p>{showFormattedDate(note.createdAt)}</p>
                            <p>{note.archived? "Archive" : "Active"}</p>
                            <p>{note.body}</p>
                        </div>
                    )
                })
            }
            <NoteItem notes={otherData} onArchive={onArchiveUpdate} onDelete={onDeleteNoteHandler} isArchive={false} showAll={true}/>
        </div>
    )
}

Detailpage.propTypes = {
    notes: PropTypes.shape({
        data: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                title: PropTypes.string.isRequired,
                body: PropTypes.string.isRequired,
                archived: PropTypes.bool.isRequired,
                createdAt: PropTypes.string.isRequired
            })
        )
    }),    
    onArchiveUpdate: PropTypes.func.isRequired,
    onDeleteNoteHandler: PropTypes.func.isRequired,    
}

export default Detailpage;