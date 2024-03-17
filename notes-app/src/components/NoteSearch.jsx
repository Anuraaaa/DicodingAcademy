import React from "react";

class NoteSearch extends React.Component {
    constructor(props) {
        super(props);

        this.onSearchChangeEvent = this.onSearchChangeEvent.bind(this);
    }

    onSearchChangeEvent(event) {
        this.props.onSearch(event.target.value.toLowerCase());
    }

    render() {
        return (
            <div className="note-container">
                <h1>Cari Catatan</h1>
                <div className="form-group">
                    <input type="text" id="search" placeholder="Masukkan judul catatan" onChange={this.onSearchChangeEvent} />
                </div>
            </div>
        )
    }
}

export default NoteSearch;