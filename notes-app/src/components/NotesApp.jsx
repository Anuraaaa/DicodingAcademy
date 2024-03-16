import React from "react";
import NoteAdd from "./NoteAdd";
import NoteItem from "./NoteItem";
import NoteSearch from "./NoteSearch";

class NotesApp extends React.Component {
    render() {
        return (
            <div className="container">
                <h1>Notes App</h1>
                <NoteAdd/>
                <NoteSearch/>
                <NoteItem/>
            </div>
        );
    }
}

export default NotesApp;