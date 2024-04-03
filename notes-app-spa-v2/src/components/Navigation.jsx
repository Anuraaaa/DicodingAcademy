import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Navigation({ logout, name }) {

    return (
        <div className="navbar">
            <h1>Notes App</h1>
            {name !== '' && 
                <ul>
                    <li className="dropdown">
                        <Link className="dropdown-title">
                            <div>{name}</div>
                            <div className="material-symbols-outlined">expand_more</div>
                        </Link>
                        <div className="dropdown-content">
                            <Link to={"/"}>Home</Link>
                            <Link to={"/notes/new"}>New</Link>
                            <Link to={"/notes/archive"}>Archive</Link>
                            <button className="logout" onClick={logout}>Logout</button>
                        </div>
                    </li>
                </ul>
            }
        </div>
    )
}

Navigation.propTypes = {
    logout: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
}

export default Navigation;