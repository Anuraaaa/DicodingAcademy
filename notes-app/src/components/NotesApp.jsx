import React from "react";
import NoteAdd from "./NoteAdd";
import NoteItem from "./NoteItem";
import NoteSearch from "./NoteSearch";
import { getData } from "../utils/data.js";
import { isValidToast, deleteToast, createToast } from "../utils/NoteToast.js";

class NotesApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            notes: getData()
        }

        this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
        this.onDeleteNoteHandler = this.onDeleteNoteHandler.bind(this);
        this.onArchiveUpdate = this.onArchiveUpdate.bind(this);
        this.onSearchNote = this.onSearchNote.bind(this);
    }

    onDeleteNoteHandler(id) {
        const notes = this.state.notes.filter(note => note.id !== id);
        this.setState({ notes });   

        if (isValidToast()) {
            deleteToast();
        }
        createToast("Berhasil menghapus note");
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
        if (isValidToast()) {
            deleteToast();
        }
        createToast("Berhasil menambahkan note");
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
        if (isValidToast()) {
            deleteToast();
        }
        createToast("Berhasil mengupadate note");
    }

    onSearchNote(query) {
        this.setState({searchQuery: query});
    }

    render() {

        let filterNote = this.state.notes;

        if (this.state.searchQuery !== undefined) {
            filterNote = this.state.notes.filter(note => note.title.toLowerCase().includes(this.state.searchQuery));
        }

        return (
            <div className="container" id="container">
                <h1>Notes App</h1>
                <NoteAdd addNote={this.onAddNoteHandler}/>
                <NoteSearch notes={filterNote} onSearch={this.onSearchNote}/>
                <NoteItem notes={filterNote} onArchive={this.onArchiveUpdate} onDelete={this.onDeleteNoteHandler}/>
            </div>
        );
    }
}

export default NotesApp;