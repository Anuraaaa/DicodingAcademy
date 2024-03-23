import React from "react";
import PropTypes from "prop-types";

class NoteList extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="note-list">
                <h1>{this.props.title}</h1>
                <p>{new Date(this.props.createdAt).toLocaleString()}</p>
                <p>{this.props.body}</p>
                <div className="note-list-group">
                    <button className="material-symbols-outlined" id="archiveBtn" onClick={() => this.props.onArchive(this.props.id)}>{this.props.archived? 'unarchive' : 'archive'}</button>
                    <button className="material-symbols-outlined delete" id="deleteBtn" onClick={() => this.props.onDelete(this.props.id)}>delete</button>
                </div>
            </div>
        )
    }
}

NoteList.propTypes =  {
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    onArchive: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
}

export default NoteList;