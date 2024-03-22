import React from "react";
import PropTypes from "prop-types";
import NoteAdd from "./NoteAdd";
import NoteItem from "./NoteItem";
import NoteSearch from "./NoteSearch";
import { getData } from "../utils/data.js";
import { showToast } from "../utils/NoteToast.js";

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

        showToast("Berhasil menghapus note", "black", "rgb(0, 204, 255)");
    }

    onAddNoteHandler({title, body, archived}) {

        if (title.length == 0)
            return showToast("Judul tidak bisa kosong!", "white", "red");    

        if (title.length > 50)
            return showToast("Judul maksimal 50 karakter!", "white", "red");    
        
        if (body.length == 0)
            return showToast("Deskripsi tidak bisa kosong!", "white", "red");    
    
        if (body.length > 500)
            return showToast("Deskripsi maksimal 500 karakter!", "white", "red");    
    
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
        showToast("Berhasil menambahkan note", "black", "rgb(0, 204, 255)");
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
        showToast("Berhasil mengupdate note", "black", "rgb(0, 204, 255)");
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

NoteItem.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        archived: PropTypes.bool.isRequired,
        createdAt: PropTypes.string.isRequired,
    })).isRequired,
    onArchive: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default NotesApp;