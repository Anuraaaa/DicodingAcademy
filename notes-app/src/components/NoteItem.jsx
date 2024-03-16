import React from "react";
import NoteList from "./NoteList";

class NoteItem extends React.Component {    
    render() {
        return(
            <div className="note-item-group">
                <div className="note-item">
                    <h1>Archive</h1>
                    <NoteList/>
                    <NoteList/>
                    <NoteList/>
                </div>
                <div className="note-item">
                    <h1>No Archive</h1>
                    <NoteList/>
                    <NoteList/>
                    <NoteList/>
                </div>
            </div>
        )
    }
}

export default NoteItem;