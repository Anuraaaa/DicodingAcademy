import React from "react";
import Navigation from "./Navigation.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage.jsx";
import AddNotepage from "../pages/AddNotepage.jsx";
import { showToast } from "../utils/NoteToast.js";
import Detailpage from "../pages/Detailpage.jsx";
import Notfoundpage from "../pages/Notfoundpage.jsx";
import Detailsearchpage from "../pages/Detailsearchpage.jsx";
import Archivepage from "../pages/Archivepage.jsx";
import Registerpage from "../pages/Registerpage.jsx";
import { addNote, archiveNote, deleteNote, getActiveNotes, getArchivedNotes, getNote, getUserLogged, putAccessToken, unarchiveNote } from "../utils/network-data.js";
import Loginpage from "../pages/Loginpage.jsx";

class NotesApp extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            notes: null,
            authedUser: null,
            initializing: true
        }

        this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
        this.onDeleteNoteHandler = this.onDeleteNoteHandler.bind(this);
        this.onArchiveUpdate = this.onArchiveUpdate.bind(this);
        this.onLoginSuccess = this.onLoginSuccess.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }

    async onAddNoteHandler({title, body, archived}) {

        if (title.length == 0)
            return showToast("Judul tidak bisa kosong!", "white", "red");    

        if (title.length > 50)
            return showToast("Judul maksimal 50 karakter!", "white", "red");    
        
        if (body.length == 0)
            return showToast("Deskripsi tidak bisa kosong!", "white", "red");    
    
        if (body.length > 500)
            return showToast("Deskripsi maksimal 500 karakter!", "white", "red");    

        const response = await addNote({
            title: title,
            body: body
        });

        if (!response.error) {
            const newNote = {
                id: `notes-${+new Date()}`,
                title,
                body,
                archived: archived,
                createdAt: new Date().toISOString()
            };
    
            this.setState(prevState => ({
                notes: {
                    ...prevState.notes,
                    data: [...prevState.notes.data, newNote]
                }
            }));
            showToast("Berhasil menambahkan note", "black", "rgb(0, 204, 255)");
        }
        else {            
            showToast("Gagal menambahkan note", "white", "red");
        }
    }
    
    async onDeleteNoteHandler(id) {
        const note = await getNote(id);

        if (note.error) {
            showToast("Gagal mengupdate note", "white", "red");
            return;
        }

        const response = await deleteNote(id);
        if (!response.error) {
            const updatedNotes = this.state.notes.data.filter(note => note.id !== id);
        
            this.setState(prevState => ({
                notes: { ...prevState.notes, data: updatedNotes }
            }));    

            showToast("Berhasil menghapus note", "black", "rgb(0, 204, 255)");
        }
        else {            
            showToast("Gagal menghapus note", "white", "red");
        }
    }

    async onArchiveUpdate(id) {
        const note = await getNote(id);

        if (note.error) {
            showToast("Gagal mengupdate note", "white", "red");
            return;
        }

        const response = note.data.archived
        ? await unarchiveNote(id)
        : await archiveNote(id);

        if (!response.error) {
            const updatedNotes = this.state.notes.data.map(note => {
                if (note.id === id) {
                    return { ...note, archived: !note.archived };
                }
                return note;
            });

            this.setState(prevState => ({
                notes: { ...prevState.notes, data: updatedNotes }
            }));

            showToast("Berhasil mengupdate note", "black", "rgb(0, 204, 255)");
        } else {
            showToast("Gagal mengupdate note", "white", "red");
        }
    }

    async onLoginSuccess({ accessToken }) {
        putAccessToken(accessToken);
        const { data } = await getUserLogged();

        this.setState(() => {
          return {
            authedUser: data,
          };
        });
    }    

    onLogout() {
        this.setState(() => {
            return {
                authedUser: null
            }
        });
        putAccessToken('');
        showToast("Berhasil logout", "black", "rgb(0, 204, 255)");
    }

    async componentDidMount() {
        const { data } = await getUserLogged();
        const activeNote = await getActiveNotes();
        const archiveNote = await getArchivedNotes();
        const noteData = {
            data: [
              ...activeNote.data,
              ...archiveNote.data
            ]
        };

        this.setState(() => {
            return {
                authedUser: data,
                initializing: false,
                notes: noteData
            };
        });        
    }

    render() {
        if (this.state.initializing) {
            return null;
        }

        if (this.state.authedUser == null) {
            return (
                <div className="container" id="container">
                    <BrowserRouter>
                        <Navigation logout={this.onLogout} name={''}/>
                        <Routes>
                            <Route path="/*" element={<Loginpage loginSuccess={this.onLoginSuccess}/>}/>                            
                            <Route path="/register" element={<Registerpage/>}/>
                            <Route path="*" element={<Notfoundpage message={""}/>}/>
                        </Routes>
                    </BrowserRouter>
                </div>
            );
        }
        else {
            return (
                <div className="container" id="container">
                    <BrowserRouter>
                        <Navigation logout={this.onLogout} name={this.state.authedUser.name}/>
                        <Routes>
                            <Route path="/" element={<Homepage notes={this.state.notes} onSearchNote={this.onSearchNote} onArchiveUpdate={this.onArchiveUpdate} onDeleteNoteHandler={this.onDeleteNoteHandler}/>}/>
                            <Route path="/notes/archive" element={<Archivepage notes={this.state.notes} onSearchNote={this.onSearchNote} onArchiveUpdate={this.onArchiveUpdate} onDeleteNoteHandler={this.onDeleteNoteHandler}/>}/>
                            <Route path="/notes/new" element={<AddNotepage notes={this.state.notes} addNote={this.onAddNoteHandler}/>}/>
                            <Route path="/notes/detail/:id" element={<Detailpage notes={this.state.notes} onArchiveUpdate={this.onArchiveUpdate} onDeleteNoteHandler={this.onDeleteNoteHandler}/>}/>
                            <Route path="/notes/search" element={<Detailsearchpage notes={this.state.notes} onArchiveUpdate={this.onArchiveUpdate} onDeleteNoteHandler={this.onDeleteNoteHandler}/>}/>
                            <Route path="*" element={<Notfoundpage message={""}/>}/>
                        </Routes>
                    </BrowserRouter>
                </div>
            );
        }
    }
}

export default NotesApp;