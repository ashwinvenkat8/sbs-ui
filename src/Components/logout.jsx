
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear the user's token from localStorage or sessionStorage
        localStorage.removeItem('authToken'); // or sessionStorage.removeItem('authToken');
        console.log('Logging out...');

        // Redirect to the login page
        navigate('/login');
    };

    return (
        <button className="logout-button" onClick={handleLogout}>
            Logout
        </button>
    );
};

export default LogoutButton;

