import React from "react";

class NoteList extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="note-list">
                <h1>{this.props.title}</h1>
                <p>{this.props.body}</p>
                <div className="note-list-group">
                    <button className="material-symbols-outlined" id="archiveBtn">{this.props.archived? 'unarchive' : 'archive'}</button>
                    <button className="material-symbols-outlined delete" id="deleteBtn">delete</button>
                </div>
            </div>
        )
    }
}

export default NoteList;