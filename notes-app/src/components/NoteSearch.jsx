import React from "react";

class NoteSearch extends React.Component {
    render() {
        return (
            <div className="note-container">
                <h1>Cari Catatan</h1>
                <div className="form-group">
                    <input type="text" id="search" placeholder="Masukkan judul catatan" />
                </div>
            </div>
        )
    }
}

export default NoteSearch;