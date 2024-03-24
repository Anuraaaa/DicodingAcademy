import React from "react";

function Notfoundpage({ message }) {
  return (
    <div className="note-container">
      <h1>404 Page Not Found</h1>
      <p>{message}</p>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
}

export default Notfoundpage;
