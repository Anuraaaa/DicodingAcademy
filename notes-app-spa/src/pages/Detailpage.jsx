import React from "react";
import { useParams } from "react-router-dom";
import NoteItem from "../components/NoteItem";

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
                            <p>{new Date(note.createdAt).toLocaleString()}</p>
                            <p>{note.body}</p>
                        </div>
                    )
                })
            }
            <NoteItem notes={otherData} onArchive={onArchiveUpdate} onDelete={onDeleteNoteHandler}/>
        </div>
    )
}

export default Detailpage;