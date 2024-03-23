import React from "react";
import PropTypes from "prop-types";
import NoteItem from "../components/NoteItem.jsx";
import NoteSearch from "../components/NoteSearch.jsx";
import { getData } from "../utils/data.js";
import { showToast } from "../utils/NoteToast.js";

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: getData()
        }

        this.onDeleteNoteHandler = this.onDeleteNoteHandler.bind(this);
        this.onArchiveUpdate = this.onArchiveUpdate.bind(this);
        this.onSearchNote = this.onSearchNote.bind(this);
    }

    onDeleteNoteHandler(id) {
        const notes = this.state.notes.filter(note => note.id !== id);
        this.setState({ notes });   

        showToast("Berhasil menghapus note", "black", "rgb(0, 204, 255)");
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
            <div>
                <NoteSearch notes={filterNote} onSearch={this.onSearchNote}/>
                <NoteItem notes={filterNote} onArchive={this.onArchiveUpdate} onDelete={this.onDeleteNoteHandler}/>
            </div>
        )
    } 
}

Home.propTypes = {
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

export default Home;