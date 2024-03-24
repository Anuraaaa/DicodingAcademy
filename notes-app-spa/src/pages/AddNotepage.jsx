import React from "react";
import NoteAdd from "../components/NoteAdd.jsx";

class AddNotepage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            addNote: this.props.addNote
        }
    }

    render() {
        return (
            <div>
                <NoteAdd addNote={this.state.addNote}/>
            </div>
        )
    }
}

export default AddNotepage;