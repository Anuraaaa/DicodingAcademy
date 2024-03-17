import React from "react";
import NoteAdd from "./NoteAdd";
import NoteItem from "./NoteItem";
import NoteSearch from "./NoteSearch";
import { getData } from "../utils/data.js";

class NotesApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            notes: getData()
        }

        this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
        this.onDeleteNoteHandler = this.onDeleteNoteHandler.bind(this);
        this.onArchiveUpdate = this.onArchiveUpdate.bind(this);
    }

    onDeleteNoteHandler(id) {
        const notes = this.state.notes.filter(note => note.id !== id);
        this.setState({ notes });   
    }

    onAddNoteHandler({title, body, archived}) {
        this.setState((prev) => {
            return {
                notes: [
                    ...prev.notes,
                    {
                        id: +new Date(),
                        title,
                        body,
                        archived: archived,
                        createdAt: new Date().toISOString()
                    }
                ]
            }
        })
    }

    onArchiveUpdate(id) {
        this.setState((prev) => ({
            notes: prev.notes.map(note => {
                if (note.id === id) {
                    return {...note, archived: !note.archived};
                }
                return note;
            })
        }))
    }

    render() {
        return (
            <div className="container">
                <h1>Notes App</h1>
                <NoteAdd addNote={this.onAddNoteHandler}/>
                <NoteSearch notes={this.state.notes}/>
                <NoteItem notes={this.state.notes} onArchive={this.onArchiveUpdate} onDelete={this.onDeleteNoteHandler}/>
            </div>
        );
    }
}

export default NotesApp;