import React from "react";
import PropTypes from "prop-types";

function Notfoundpage({ message }) {
  
  return (
    <div className="note-container">
      <h1>404 Page Not Found</h1>
      {message && <p>{message}</p>}
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
}


Notfoundpage.propTypes = {
  message: PropTypes.string.isRequired
}

export default Notfoundpage;
