import React, { useState } from "react";
import PropTypes from "prop-types";
import { useLocaleProvider } from "./LocaleProvider";

function NoteAdd ({ addNote }) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const { language } = useLocaleProvider();

    const onTitleChangeEventHandler = (event) => {
        setTitle(event.target.value);
    };

    const onBodyChangeEventHandler = (event) => {
        setBody(event.target.value);
    };

    const onSubmitEventHandler = (event) => {
        event.preventDefault();
        addNote({ title, body });
    };

    return (
        <form className="note-container" id="form" onSubmit={onSubmitEventHandler}>
            <h1>{language == 'en' ? 'Add Note' : 'Tambah Catatan'}</h1>
            <div className="form-group">
                <label htmlFor="title">{language == 'en' ? 'Title' : 'Judul'}</label>
                <input type="text" id="title" placeholder={language == 'en' ? 'Please insert title note' : 'Masukkan judul catatan'} value={title} onChange={onTitleChangeEventHandler} />
                <p>{title.length}/50</p>
            </div>
            <div className="form-group">
                <label htmlFor="body">{language == 'en' ? 'Description' : 'Deskripsi'}</label>
                <textarea id="body" cols="30" rows="10" placeholder={language == 'en' ? 'Please insert description note' : 'Masukkan deskripsi catatan'} value={body} onChange={onBodyChangeEventHandler}></textarea>
                <p>{body.length}/500</p>
            </div>
            <div className="form-group">
                <button type="submit" id="addBtn">{language == 'en' ? '+Add' : '+Tambah'}</button>
            </div>
        </form>
    );
};

NoteAdd.propTypes = {
    addNote: PropTypes.func.isRequired,
};

export default NoteAdd;
