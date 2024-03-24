import React from "react";
import NoteItem from "../components/NoteItem.jsx";
import NoteSearch from "../components/NoteSearch.jsx";

class Homepage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            notes: this.props.notes,
            onArchiveUpdate: this.props.onArchiveUpdate,
            onDeleteNoteHandler: this.props.onDeleteNoteHandler,
            searchQuery: undefined
        }

        this.onSearchNote = this.onSearchNote.bind(this);
    }

    onSearchNote(query) {
        this.setState({searchQuery: query});
    }

    componentDidUpdate(prevProps) {
        if (prevProps.notes !== this.props.notes) {
            this.setState({ notes: this.props.notes });
        }
        if (prevProps.onSearchNote !== this.props.onSearchNote) {
            this.setState({ notes: this.props.searchQuery });
        }
    }
    
    render() {
        let filterNote = this.state.notes;
        if (this.state.searchQuery !== undefined) {
            filterNote = this.state.notes.filter(note => note.title.toLowerCase().includes(this.state.searchQuery));
        }

        return (
            <div>
                <NoteSearch notes={filterNote} onSearch={this.onSearchNote}/>
                <NoteItem notes={filterNote} onArchive={this.state.onArchiveUpdate} onDelete={this.state.onDeleteNoteHandler}/>
            </div>
        )
    } 
}

export default Homepage;