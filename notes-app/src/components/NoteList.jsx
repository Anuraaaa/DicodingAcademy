import React from "react";

class NoteList extends React.Component {
    render() {
        return (
            <div className="note-list">
                <h1>Lorem ipsum dolor sit.</h1>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis asperiores inventore corporis corrupti exercitationem nostrum illo.</p>
                <div className="note-list-group">
                    <button className="material-symbols-outlined">archive</button>
                    <button className="material-symbols-outlined delete">delete</button>
                </div>
            </div>
        )
    }
}

export default NoteList;