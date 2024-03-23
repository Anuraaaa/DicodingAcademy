import React from "react";
import Navigation from "./Navigation.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Tambah from "../pages/Tambah.jsx";

function NotesApp() {
    return (
        <div className="container" id="container">
            <BrowserRouter>
                <Navigation/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/add" element={<Tambah/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default NotesApp;