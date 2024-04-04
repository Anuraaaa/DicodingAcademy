import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useLocaleProvider } from "./LocaleProvider";

function Navigation({ logout, name }) {

    const {theme, toggleTheme} = useLocaleProvider();
    const {language, toggleLanguage} = useLocaleProvider();

    return (
        <div className="navbar">
            <h1>{language == 'en'? 'Notes App' : 'Aplikasi Note'}</h1>
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
                                <Link to={"/"}>{language == 'en'? 'Home' : 'Rumah'}</Link>
                                <Link to={"/notes/new"}>{language == 'en'? 'New' : 'Baru'}</Link>
                                <Link to={"/notes/archive"}>{language == 'en'? 'Archive' : 'Arsip'}</Link>
                                <button className="logout" onClick={logout}>{language == 'en'? 'Logout' : 'Keluar'}</button>
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