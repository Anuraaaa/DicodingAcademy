import React from "react";
import PropTypes from "prop-types";

class NoteSearch extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            search: undefined
        }

        this.onSearchChangeEvent = this.onSearchChangeEvent.bind(this);
        this.onSubmitSearch = this.onSubmitSearch.bind(this);
        this.onClickSearch = this.onClickSearch.bind(this);
    }

    onSearchChangeEvent(event) {
        this.setState(() => {
            return {
                search: event.target.value.toLowerCase()
            }
        })
    }

    onSubmitSearch(event){
        event.preventDefault();
        this.props.onSearch(this.state.search);
    }

    onClickSearch() {
        this.props.onClickSearch(this.state.search);
    }
    
    render() {
        return (
            <div className="note-container">
                <h1>Cari Catatan</h1>
                <div className="form-group">
                    <input type="text" id="search" placeholder="Masukkan judul catatan" onChange={this.onSearchChangeEvent} />
                    <button type="submit" onClick={() => this.onClickSearch()}>Search</button>
                </div>
            </div>
        )
    }
}

NoteSearch.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        archived: PropTypes.bool.isRequired,
        createdAt: PropTypes.string.isRequired,
    })).isRequired,
    onSearch: PropTypes.func.isRequired,
}

export default NoteSearch;