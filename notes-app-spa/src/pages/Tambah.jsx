import React from "react";
import PropTypes from "prop-types";
import NoteAdd from "../components/NoteAdd.jsx";

class Tambah extends React.Component {

    constructor(props) {
        super(props);

        this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    }

    onAddNoteHandler({title, body, archived}) {

        if (title.length == 0)
            return showToast("Judul tidak bisa kosong!", "white", "red");    

        if (title.length > 50)
            return showToast("Judul maksimal 50 karakter!", "white", "red");    
        
        if (body.length == 0)
            return showToast("Deskripsi tidak bisa kosong!", "white", "red");    
    
        if (body.length > 500)
            return showToast("Deskripsi maksimal 500 karakter!", "white", "red");    
    
        this.setState((prev) => {
            return {
                notes: [
                    ...prev.notes,
                    {
                        id: +new Date(),
                        title,
                        body,
                        archived: archived,
                        createdAt: new Date().toISOString()
                    }
                ]
            }
        })
        showToast("Berhasil menambahkan note", "black", "rgb(0, 204, 255)");
    }

    render() {
        return (
            <div>
                <NoteAdd addNote={this.onAddNoteHandler}/>
            </div>
        )
    }
}

export default Tambah;