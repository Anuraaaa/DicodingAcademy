import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useTheme } from "./LocaleProvider";

function Navigation({ logout, name }) {

    const {theme, toggleTheme} = useTheme();
    const {language, toggleLanguage} = useTheme();

    return (
        <div className="navbar">
            <h1>Notes App</h1>
            <ul>
                <li><button className="material-symbols-outlined" onClick={toggleTheme}>{theme === 'light' ? 'light_mode' : 'dark_mode'}</button></li>                
                <li>
                    <button className="lang-group" onClick={toggleLanguage}>
                        <div className="material-symbols-outlined">g_translate</div>
                        <div>{language === 'en'? 'en' : 'id'}</div>
                    </button>
                </li>
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