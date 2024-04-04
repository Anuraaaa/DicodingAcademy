import React from "react";
import PropTypes from "prop-types";

class NoteAdd extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            body: ''
        }

        this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
        this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
        this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
    }
    
    onTitleChangeEventHandler(event) {
        this.setState(() => {
            return {
                title: event.target.value
            }
        })
    }

    onBodyChangeEventHandler(event) {
        this.setState(() => {
            return {
                body: event.target.value
            }
        })
    }

    onSubmitEventHandler(event) {
        event.preventDefault();
        this.props.addNote(this.state);
    }

    render() {
        return (
            <form className="note-container" id="form" onSubmit={this.onSubmitEventHandler}>
                <h1>Tambah Catatan</h1>
                <div className="form-group">
                    <label htmlFor="title">Judul</label>
                    <input type="text" id="title" placeholder="Masukkan judul catatan" value={this.state.title} onChange={this.onTitleChangeEventHandler}/>
                    <p>{this.state.title.length}/50</p>
                </div>
                <div className="form-group">
                    <label htmlFor="body">Deskripsi</label>
                    <textarea id="body" cols="30" rows="10" placeholder="Masukkan deskripsi catatan" value={this.state.body} onChange={this.onBodyChangeEventHandler}></textarea>
                    <p>{this.state.body.length}/500</p>
                </div>
                <div className="form-group">
                    <button type="submit" id="addBtn">+Tambah</button>
                </div>
            </form>
        )
    }
}

NoteAdd.propTypes = {
    addNote: PropTypes.func.isRequired,
};

export default NoteAdd;