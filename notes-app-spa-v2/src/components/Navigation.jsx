import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useTheme } from "./ThemeProvider";

function Navigation({ logout, name }) {

    const {theme, toggleTheme} = useTheme();
    return (
        <div className="navbar">
            <h1>Notes App</h1>
            <ul>
                <li><button className="material-symbols-outlined" onClick={toggleTheme}>{theme === 'light' ? 'light_mode' : 'dark_mode'}</button></li>                
                {name !== '' && 
                    <>
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
                    </>
                }
            </ul>
        </div>
    )
}

Navigation.propTypes = {
    logout: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
}

export default Navigation;