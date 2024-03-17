import React from "react";
import NoteList from "./NoteList";

class NoteItem extends React.Component { 
    constructor(props) {
        super(props);
    }   
    render() {
        return(
            <div className="note-item-group">
                <div className="note-item">
                    <h1>Archive</h1>
                    {
                        this.props.notes.filter(note => note.archived === true).map((note) => {                            
                            return(
                                <NoteList key={note.id} id={note.id} onDelete={this.props.onDelete} {...note}/>
                            )
                        })
                    }
                </div>
                <div className="note-item">
                    <h1>No Archive</h1>
                    {
                        this.props.notes.filter(note => note.archived === false).map((note) => {
                            return (
                                <NoteList key={note.id} id={note.id} onDelete={this.props.onDelete} {...note}/>
                            )                            
                        })
                    }
                </div>
            </div>
        )
    }
}

export default NoteItem;