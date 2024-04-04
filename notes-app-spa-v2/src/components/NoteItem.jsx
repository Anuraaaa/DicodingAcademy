import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import NoteList from "./NoteList";
import { useLocaleProvider } from "./LocaleProvider";

function NoteItem ({ notes, onArchive, onDelete, isArchive, showAll }) {
    const [activeNote, setActiveNote] = useState([]);
    const [archiveNote, setArchiveNote] = useState([]);
    const { language } = useLocaleProvider();

    useEffect(() => {
        setActiveNote(notes.filter((note) => !note.archived));
        setArchiveNote(notes.filter((note) => note.archived));
    }, [notes]);

    if (showAll) {
        return (
            <div className="note-item-group">
                <div className="note-item">
                    <h1>{language == 'en'? 'Active' : 'Aktif'}</h1>
                    {activeNote.length > 0 ? (
                        activeNote.map((note) => (
                            <NoteList
                                key={note.id}
                                id={note.id}
                                onArchive={onArchive}
                                onDelete={onDelete}
                                {...note}
                            />
                        ))
                    ) : (
                        <p>{language == 'en'? 'There is no any note' : 'Tidak ada catatan'}</p>
                    )}
                </div>
                <div className="note-item">
                    <h1>{language == 'en'? 'Archive' : 'Arsip'}</h1>
                    {archiveNote.length > 0 ? (
                        archiveNote.map((note) => (
                            <NoteList
                                key={note.id}
                                id={note.id}
                                onArchive={onArchive}
                                onDelete={onDelete}
                                {...note}
                            />
                        ))
                    ) : (
                        <p>{language == 'en'? 'There is no any note' : 'Tidak ada catatan'}</p>
                    )}
                </div>
            </div>
        );
    } else {
        const notesToRender = isArchive ? archiveNote : activeNote;
        return (
            <div className="note-item-group-single">
                <div className="note-item-single">
                    <h1>{isArchive ? language == 'en'? 'Archive' : 'Arsip' : language == 'en'? 'Active' : 'Aktif'}</h1>
                    {notesToRender.length > 0 ? (
                        notesToRender.map((note) => (
                            <NoteList
                                key={note.id}
                                id={note.id}
                                onArchive={onArchive}
                                onDelete={onDelete}
                                {...note}
                            />
                        ))
                    ) : (
                        <p>{language == 'en'? 'There is no any note' : 'Tidak ada catatan'}</p>
                    )}
                </div>
            </div>
        );
    }
};

NoteItem.propTypes = {
    notes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            body: PropTypes.string.isRequired,
            archived: PropTypes.bool.isRequired,
            createdAt: PropTypes.string.isRequired,
        })
    ).isRequired,
    onArchive: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    isArchive: PropTypes.bool.isRequired,
    showAll: PropTypes.bool.isRequired,
};

export default NoteItem;
