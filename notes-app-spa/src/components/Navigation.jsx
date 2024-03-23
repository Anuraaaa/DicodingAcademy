import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
    return (
        <div className="navbar">
            <h1>Notes App</h1>
            <ul className="navbar-list">
                <li><Link to={"/"}>Home</Link></li>
                <li><Link to={"/add"}>Tambah</Link></li>
            </ul>
        </div>
    )
}

export default Navigation;