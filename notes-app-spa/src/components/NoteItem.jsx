import React from "react";
import PropTypes from "prop-types";
import NoteList from "./NoteList";

class NoteItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="note-item-group">
                <div className="note-item">
                    <h1>Archive</h1>
                    {this.props.notes &&
                        this.props.notes
                            .filter((note) => note.archived === true)
                            .map((note) => (
                                <NoteList
                                    key={note.id}
                                    id={note.id}
                                    onArchive={this.props.onArchive}
                                    onDelete={this.props.onDelete}
                                    {...note}
                                />
                            ))}
                    {!this.props.notes ||
                        (!this.props.notes.some((note) => note.archived === true) && (
                            <p>There are no data notes</p>
                        ))}
                </div>
                <div className="note-item">
                    <h1>No Archive</h1>
                    {this.props.notes &&
                        this.props.notes
                            .filter((note) => note.archived === false)
                            .map((note) => (
                                <NoteList
                                    key={note.id}
                                    id={note.id}
                                    onArchive={this.props.onArchive}
                                    onDelete={this.props.onDelete}
                                    {...note}
                                />
                            ))}
                    {!this.props.notes ||
                        (!this.props.notes.some((note) => note.archived === false) && (
                            <p>There are no data notes</p>
                        ))}
                </div>
            </div>
        );
    }
}

NoteItem.propTypes = {
    notes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
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
