import React from "react";
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

export default NoteItem;
