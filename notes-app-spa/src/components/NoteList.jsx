import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatter";

class NoteList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id,
            title: this.props.title,
            body: this.props.body,
            archived: this.props.archived,
            createdAt: this.props.createdAt,
            onArchive: this.props.onArchive,
            onDelete: this.props.onDelete
        }
    }
    
    render() {
        return (
            <div className="note-list">
                <h1><Link to={`/notes/detail/${this.state.id}`}>{this.state.title}</Link></h1>
                <p><Link to={`/notes/detail/${this.state.id}`}>{formatDate(this.state.createdAt)}</Link></p>
                <p><Link to={`/notes/detail/${this.state.id}`}>{this.state.body}</Link></p>
                <div className="note-list-group">
                    <button className="material-symbols-outlined" id="archiveBtn" onClick={() => this.state.onArchive(this.state.id)}>{this.state.archived? 'unarchive' : 'archive'}</button>
                    <button className="material-symbols-outlined delete" id="deleteBtn" onClick={() => this.state.onDelete(this.state.id)}>delete</button>
                </div>
            </div>
        )
    }
}

NoteList.propTypes =  {
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    onArchive: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
}

export default NoteList;