import React from "react";
import "./popup.css"

const Popup = ({ user, onClose }) => {
    return (
        <div style={{ position: 'fixed', top: '20%', left: '30%', backgroundColor: 'white', padding: '20px', border: '1px solid #ccc', zIndex: 100 }}>
            <h3>User Details</h3>
            {/* Display user details */}
            <p>Name: {user.name}</p>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            {/* More detailed fields */}
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default Popup;