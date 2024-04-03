import React from "react";
import PropTypes from "prop-types";
import NoteAdd from "../components/NoteAdd.jsx";

class AddNotepage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            addNote: this.props.addNote, 
            notes: this.props.notes //possible no
        }
    }

    // possible no
    componentDidUpdate(prevProps) {
        if (prevProps.notes !== this.props.notes) {
            this.setState({
                notes: this.props.notes
            }); 
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

AddNotepage.propTypes = {
    addNote: PropTypes.func.isRequired
};

export default AddNotepage;