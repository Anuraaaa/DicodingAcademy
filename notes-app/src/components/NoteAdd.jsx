import React from "react";

class NoteAdd extends React.Component {
    render() {
        return (
            <div className="note-container">
                <h1>Tambah Catatan</h1>
                <div className="form-group">
                    <label htmlFor="title">Judul</label>
                    <input type="text" id="title" placeholder="Masukkan judul catatan"/>
                </div>
                <div className="form-group">
                    <label htmlFor="body">Deskripsi</label>
                    <input type="text" id="body" placeholder="Masukkan deskripsi catatan"/>
                </div>
                <div className="form-group">
                    <label htmlFor="archive">Archive</label>
                    <select name="archive" id="archive" defaultValue={"yes"}>
                        <option value={"yes"}>Yes</option>
                        <option value={"no"}>No</option>
                    </select>
                </div>
                <div className="form-group">
                    <button>+Tambah</button>
                </div>
            </div>
        )
    }
}

export default NoteAdd;