import React, { useState } from "react";
import PropTypes from "prop-types";
import { useLocaleProvider } from "./LocaleProvider";

function NoteSearch ({ onSearch, onClickSearch }) {
    const [search, setSearch] = useState(undefined);
    const { language } = useLocaleProvider();

    const onSearchChangeEvent = (event) => {
        setSearch(event.target.value.toLowerCase());
    };

    const onSubmitSearch = (event) => {
        event.preventDefault();
        onSearch(search);
    };

    const onClickSearchButton = () => {
        onClickSearch(search);
    };

    return (
        <div className="note-container">
            <h1>{language === 'en' ? 'Search Notes' : 'Cari Catatan'}</h1>
            <div className="form-group">
                <input type="text" id="search" placeholder={language === 'en' ? 'Please insert title notes' : 'Masukkan judul catatan'} onChange={onSearchChangeEvent} />
                <button type="submit" onClick={onClickSearchButton}>{language === 'en' ? 'Search' : 'Cari'}</button>
            </div>
        </div>
    );
};

NoteSearch.propTypes = {
    onSearch: PropTypes.func.isRequired,
    onClickSearch: PropTypes.func.isRequired,
};

export default NoteSearch;
