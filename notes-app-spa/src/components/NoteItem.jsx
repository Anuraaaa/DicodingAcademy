import React from "react";
import PropTypes from "prop-types";
import NoteList from "./NoteList";

class NoteItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: this.props.notes
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.notes !== this.props.notes) {
            this.setState({
                notes: this.props.notes
            }); 
        }       
    }

    render() {
        const activeNote = this.state.notes.filter(note => note.archived === false);
        const archiveNote = this.state.notes.filter(note => note.archived === true);

        return (
            <div className="note-item-group">
                <div className="note-item">
                    <h1>Active</h1>
                    {activeNote && activeNote.length > 0 ? (
                        activeNote.map((note) => (
                            <NoteList
                                key={note.id}
                                id={note.id}
                                onArchive={this.props.onArchive}
                                onDelete={this.props.onDelete}
                                {...note}
                            />
                        ))
                    ) : (
                        <p>Tidak ada catatan</p>
                    )}
                </div>
                <div className="note-item">
                    <h1>Archive</h1>
                    {archiveNote && archiveNote.length > 0 ? (
                        archiveNote.map((note) => (
                            <NoteList
                                key={note.id}
                                id={note.id}
                                onArchive={this.props.onArchive}
                                onDelete={this.props.onDelete}
                                {...note}
                            />
                        ))
                    ) : (
                        <p>Tidak ada catatan</p>
                    )}
                </div>
            </div>
        );
    }
}

NoteItem.propTypes = {
    notes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            body: PropTypes.string.isRequired,
            archived: PropTypes.bool.isRequired,
            createdAt: PropTypes.string.isRequired,
        })
    ).isRequired,
    onArchive: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,    
}

export default NoteItem;
